'use client' // Error boundaries must be Client Components

interface CustomError extends Error {
    errMessage: string;
}

export default function ErrorPage({
                                      error,
                                      unstable_retry,
                                  }: {
    error: CustomError & { digest?: string }
    unstable_retry?: () => void
}) {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h2 className="display-4 fw-bold">{error?.errMessage}</h2>
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