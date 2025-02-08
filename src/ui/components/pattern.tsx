import { useTheme } from "@/hooks/use-theme";

export function Pattern() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "light" && <div className="pattern pattern-light" />}
      {theme === "dark" && <div className="pattern pattern-dark" />}
    </>
  );
}
