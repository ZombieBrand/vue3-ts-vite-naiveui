import type { RouteMeta, LocationQuery } from "vue-router";

export interface TTagsView {
  fullPath: string;
  meta: RouteMeta;
  name: string | symbol | undefined | null;
  params: Record<string, string | string[]>;
  path: string;
  query: LocationQuery;
  title: string;
}
