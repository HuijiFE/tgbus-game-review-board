declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.png' {
  const content: any;
  export default content;
}
