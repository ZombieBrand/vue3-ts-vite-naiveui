import { useAppStore } from "@/store/modules/app";
import { computed, ComputedRef } from "vue";
import chroma from "chroma-js";
import { GlobalThemeOverrides } from "naive-ui";

export default function () {
  const appStore = useAppStore();
  const primaryColor = computed(() => appStore.primaryColor);
  const primaryColorHover = computed(() =>
    chroma(primaryColor.value).brighten(0.4).css("hsl")
  );
  const primaryColorPressed = computed(() =>
    chroma(primaryColor.value).darken(0.8).css("hsl")
  );

  const themeOverrides: ComputedRef<GlobalThemeOverrides> = computed(() => ({
    common: {
      fontWeightStrong: "600",
      primaryColor: primaryColor.value,
      primaryColorHover: hasDefaultColor()
        ? "#36AD6AFF"
        : primaryColorHover.value,
      primaryColorPressed: hasDefaultColor()
        ? "#0C7A43FF"
        : primaryColorPressed.value,
      primaryColorSuppl: hasDefaultColor()
        ? "#36AD6AFF"
        : primaryColorHover.value,
    },
  }));

  function hasDefaultColor() {
    return (
      chroma(primaryColor.value).css("hsl") === "hsl(148.24,73.91%,36.08%)"
    );
  }
  return themeOverrides;
}
