import React from 'react';
import { Link } from 'react-router-dom';

export function MinimalHome() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">FixiDesk</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
        
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Transform Customer Support with{' '}
            <span className="text-blue-600">AI-Powered</span>{' '}
            Automation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            FixiDesk revolutionizes your helpdesk with intelligent automation, instant responses, 
            and seamless integrations. Reduce response times by 90% and boost customer satisfaction.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-50">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}