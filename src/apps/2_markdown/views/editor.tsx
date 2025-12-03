import CodeMirrorEditor from '@/components/low_level/codeMirrorEditor';

export default function Dashboard() {
  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-semibold mb-2">Markdown Editor</h1>
      <p className="text-sm text-muted-foreground">Overview for App 2.</p>
      <CodeMirrorEditor value="// Type here" onChange={console.log} />
    </div>
  )
}


