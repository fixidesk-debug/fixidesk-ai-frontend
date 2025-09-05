type AnalyticsEvent = {
  name: string;
  props?: Record<string, unknown>;
};

export function track(event: AnalyticsEvent) {
  try {
    // Placeholder: wire to your analytics provider here
    const sanitizedName = event.name.replace(/[\r\n\t]/g, ' ').slice(0, 100);
    console.debug("[analytics]", sanitizedName, event.props ?? {});
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


