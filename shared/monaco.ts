import { editor } from 'monaco-editor/esm/vs/editor/editor.api'

export type EditorInstance = {
  instance: editor.IStandaloneCodeEditor
  dispose: () => void
  getValue: () => string
  onDidChangeModelContent: (callback: (e: editor.IModelContentChangedEvent) => void) => void
}
export function createEditor(container: HTMLElement, content: string): EditorInstance {
  const instance = editor.create(container,
    {
      language: 'markdown',
      value: content,
      theme: 'vs-light',
      fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: 16,
      lineHeight: 21,
      minimap: { enabled: false },
      wordWrap: 'on',
      fixedOverflowWidgets: true,
      unicodeHighlight: {
        ambiguousCharacters: false,
      },
    })
  return {
    instance,
    dispose: () => instance.dispose(),
    getValue: () => instance.getValue(),
    onDidChangeModelContent: (callback) => instance.onDidChangeModelContent(callback),
  }
}
