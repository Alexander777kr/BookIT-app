'use client' // Error boundaries must be Client Components

export default function ErrorPage({
                                      error,
                                      unstable_retry,
                                  }: {
    error: Error & { digest?: string }
    unstable_retry?: () => void
}) {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h2 className="display-4 fw-bold">{error?.message}</h2>
                    <p className="fs-3">
                        <span className="text-danger">Oops!</span>
                        {" "}Something went wrong!
                    </p>
                    <p className="lead">Sorry for inconvenience.</p>

                    <button className="btn btn-primary"
                            onClick={
                                // Attempt to recover by re-fetching and re-rendering the segment
                                () => unstable_retry?.()
                            }
                    >
                        Try again
                    </button>
                </div>
            </div>

        </div>
    )
}