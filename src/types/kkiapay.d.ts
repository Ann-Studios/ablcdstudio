// Allow using the Kkiapay web component in TSX without type errors
// This covers the custom element <kkiapay-widget ... /> injected by the SDK.
declare namespace JSX {
  interface IntrinsicElements {
    "kkiapay-widget": any;
  }
}
