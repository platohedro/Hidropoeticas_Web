/// <reference types="astro/client" />
/// <reference types="astro/jsx-runtime" />

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    class?: string;
    className?: string;
  }
}