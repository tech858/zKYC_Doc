import DocNav from '../_components/DocNav';
import { ExternalLinkIcon } from '../_components/icons';

export default function DemoPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-purple-600/25 px-3 py-1 text-xs font-semibold text-purple-100">Demo</p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Download the demo project</h1>
        <p className="max-w-3xl text-lg text-slate-300">
          Explore a working example of the zKYC SDK, including configuration for different verification options.
        </p>
      </header>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <a
          href="https://github.com/tech858/aws_zkyc_test"
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-2 rounded-md bg-white px-4 py-2 text-black transition hover:bg-slate-100"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          View on GitHub
        </a>
        <a
          href="/downloadable/Demo_Download.zip"
          download
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-slate-800"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          Download zip
        </a>
        <div className="space-y-3 text-slate-300">
          <p>
            Configure the client ID and API key from your dashboard. Choose verification types (basic, OCR, liveness or
            both), set pending/failure URLs, and launch the flow.
          </p>
          <p>
            The provided pending page template uses the status endpoint to show verification results. You can replace it
            with your own UI using the same API calls.
          </p>
        </div>
      </div>

      <DocNav />
    </div>
  );
}

