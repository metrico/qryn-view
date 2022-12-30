import $ from 'jquery';

const w: any = window;
w.$ = $;
w.jQuery = $;

// if (!w.$?.plot) {
//   w.$.plot = { plugins: [] };
// } else if (!w.$?.plot?.plugins) {
//   w.$.plot.plugins = [];
// }