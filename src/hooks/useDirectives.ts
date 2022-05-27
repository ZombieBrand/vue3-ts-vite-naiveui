import { resolveDirective, Directive } from "vue";

export function permissionDirective() {
  return resolveDirective("permission") as Directive;
}
