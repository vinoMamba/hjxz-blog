import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts(),
  ],
  rules: [
    [/^text-(\d+)$/, ([_, match]) => ({ fontSize: `${match}px` })]
  ],
  shortcuts: {}
})
