import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Ticket = Tables<'tickets'>;
type TicketInsert = TablesInsert<'tickets'>;
type TicketUpdate = TablesUpdate<'tickets'>;
type TicketComment = Tables<'ticket_comments'>;

interface TicketWithDetails extends Ticket {
  customer_first_name?: string;
  customer_last_name?: string;
  customer_phone?: string;
  customer_company?: string;
  agent_first_name?: string;
  agent_last_name?: string;
  category_name?: string;
  category_color?: string;
  organization_name?: string;
}

interface UseTicketsOptions {
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export const useTickets = (options: UseTicketsOptions = {}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: ticketsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['tickets', options],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Get user profile to determine role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      let query = supabase
        .from('tickets')
        .select(`
          *,
          customer:profiles!tickets_customer_id_fkey(first_name, last_name, phone, company_name),
          assigned_agent:profiles!tickets_assigned_agent_id_fkey(first_name, last_name),
          category:ticket_categories(name, color),
          organization:organizations(name)
        `);

      // Apply role-based filtering
      if (profile?.role === 'customer') {
        query = query.eq('customer_id', user.id);
      } else if (profile?.role === 'agent') {
        query = query.or(`assigned_agent_id.eq.${user.id},customer_id.eq.${user.id}`);
      }
      // Admins can see all tickets (no additional filter)

      // Apply filters
      if (options.status) {
        query = query.eq('status', options.status);
      }
      if (options.priority) {
        query = query.eq('priority', options.priority);
      }

      // Apply pagination and ordering
      const page = options.page || 1;
      const limit = options.limit || 20;
      const offset = (page - 1) * limit;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Transform data to match expected interface
      const transformedTickets: TicketWithDetails[] = data?.map(ticket => ({
        ...ticket,
        customer_first_name: ticket.customer?.first_name,
        customer_last_name: ticket.customer?.last_name,
        customer_phone: ticket.customer?.phone,
        customer_company: ticket.customer?.company_name,
        agent_first_name: ticket.assigned_agent?.first_name,
        agent_last_name: ticket.assigned_agent?.last_name,
        category_name: ticket.category?.name,
        category_color: ticket.category?.color,
        organization_name: ticket.organization?.name,
      })) || [];

      return {
        tickets: transformedTickets,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
      };
    },
    enabled: !!user,
  });

  const createTicketMutation = useMutation({
    mutationFn: async (ticketData: Omit<TicketInsert, 'customer_id' | 'customer_email'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tickets')
        .insert({
          ...ticketData,
          customer_id: user.id,
          customer_email: user.email,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const updateTicketMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TicketUpdate }) => {
      const { data, error } = await supabase
        .from('tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  return {
    tickets: ticketsData?.tickets || [],
    total: ticketsData?.total || 0,
    page: ticketsData?.page || 1,
    totalPages: ticketsData?.totalPages || 1,
    isLoading,
    error,
    refetch,
    createTicket: createTicketMutation.mutate,
    updateTicket: updateTicketMutation.mutate,
    isCreating: createTicketMutation.isPending,
    isUpdating: updateTicketMutation.isPending,
  };
};

export const useTicket = (ticketId: string) => {
  const { user } = useAuth();

  const {
    data: ticketData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: async () => {
      if (!user || !ticketId) throw new Error('Missing required data');

      // Get ticket with all related data
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select(`
          *,
          customer:profiles!tickets_customer_id_fkey(first_name, last_name, phone, company_name, email),
          assigned_agent:profiles!tickets_assigned_agent_id_fkey(first_name, last_name, email),
          category:ticket_categories(name, color),
          organization:organizations(name)
        `)
        .eq('id', ticketId)
        .single();

      if (ticketError) throw ticketError;

      // Get ticket comments
      const { data: comments, error: commentsError } = await supabase
        .from('ticket_comments')
        .select(`
          *,
          author:profiles(first_name, last_name, avatar_url, email)
        `)
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      return { ticket, comments: comments || [] };
    },
    enabled: !!user && !!ticketId,
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !ticketId) throw new Error('Missing required data');

      const { data, error } = await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticketId,
          author_id: user.id,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  return {
    ticket: ticketData?.ticket,
    comments: ticketData?.comments || [],
    isLoading,
    error,
    refetch,
    addComment: addCommentMutation.mutate,
    isAddingComment: addCommentMutation.isPending,
  };
};

export const useTicketCategories = () => {
  const {
    data: categories,
    isLoading,
    error
  } = useQuery({
    queryKey: ['ticketCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticket_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },
  });

  return {
    categories: categories || [],
    isLoading,
    error,
  };
};
