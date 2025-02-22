import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold mb-2">Text Summarization</h2>
          <p className="text-gray-600">
            Simplify long texts into concise summaries quickly.
          </p>
          <Link
            href="/summarization"
            className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded transition duration-200"
          >
            Try Summarization
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold mb-2">Text Extraction</h2>
          <p className="text-gray-600">
            Extract text with <b>a link</b> and generate summary.
          </p>
          <Link
            href="/text_extraction"
            className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded transition duration-200"
          >
            Try Text Extraction
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold mb-2">Sentiment Analysis</h2>
          <p className="text-gray-600">
            Analyze text to detect positive, negative, or neutral sentiments.
          </p>
          <Link
            href="/sentiment_analysis"
            className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded transition duration-200"
          >
            Try Sentiment Analysis
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Stay tuned for updates.</p>
        </div>
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Stay tuned for updates.</p>
        </div>
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Stay tuned for updates.</p>
        </div>
      </div>
    </div>
  );
}
