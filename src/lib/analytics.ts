type AnalyticsEvent = {
  name: string;
  props?: Record<string, unknown>;
};

export function track(event: AnalyticsEvent) {
  try {
    // Placeholder: wire to your analytics provider here
    console.debug("[analytics]", event.name, event.props ?? {});
  } catch (_) {
    // no-op
  }
}

export function trackPageView(path: string) {
  track({ name: "page_view", props: { path } });
}

export function trackClick(id: string, props?: Record<string, unknown>) {
  track({ name: `click:${id}`, props });
}


