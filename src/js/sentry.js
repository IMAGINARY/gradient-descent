import * as Sentry from '@sentry/browser';

export default function initSentry(sentryDSN) {
    return Sentry.init({
        dsn: sentryDSN,
        transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),
        transportOptions: {
        },
        integrations: [
            Sentry.captureConsoleIntegration({
                // array of methods that should be captured
                // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
                levels: ['error'],
            }),
        ],
        // Disable traces, replays and profiling
        tracesSampleRate: 0,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0,
        profilesSampleRate: 0,
    });
}
