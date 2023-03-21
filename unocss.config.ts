import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts(),
  ],
  rules: [
    [/^text-(\d+)$/, ([_, match]) => ({ fontSize: `${match}px` })],
    ['nav-bgf', { 'backdrop-filter': 'blur(20px)' }],
    ['nav-letter', { 'letter-spacing': '1px' }],
    ['nav-bs', { 'box-shadow': '0 2px 4px rgb(0 0 0 / 12%)' }],
  ],
  shortcuts: {}
})
