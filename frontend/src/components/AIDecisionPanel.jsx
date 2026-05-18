export default function AIDecisionPanel({ result }) {

    if (!result) return null

    return (

        <div className="space-y-6">

            <div className="
                bg-slate-950
                border
                border-cyan-500/20
                rounded-2xl
                p-6
            ">

                <h3 className="text-xl font-bold text-cyan-400">
                    Root Cause Analysis
                </h3>

                <p className="text-slate-300 mt-4 leading-7">
                    {result?.rootcause_result?.details?.analysis}
                </p>

            </div>


            <div className="
                bg-slate-950
                border
                border-cyan-500/20
                rounded-2xl
                p-6
            ">

                <h3 className="text-xl font-bold text-cyan-400">
                    Recovery Strategy
                </h3>

                <div className="mt-4 space-y-3">

                    {result?.recovery_result?.details?.recoverySteps?.map(
                        (step, index) => (
                            <div
                                key={index}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-slate-300
                                "
                            >

                                <div className="
                                    w-7
                                    h-7
                                    rounded-full
                                    bg-cyan-500/20
                                    text-cyan-400
                                    flex
                                    items-center
                                    justify-center
                                    text-sm
                                    font-bold
                                ">
                                    {index + 1}
                                </div>

                                <span>{step}</span>

                            </div>
                        )
                    )}

                </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="
                    bg-slate-950
                    border
                    border-cyan-500/20
                    rounded-2xl
                    p-5
                ">

                    <div className="text-slate-400 text-sm">
                        Confidence Score
                    </div>

                    <div className="text-4xl font-bold text-cyan-400 mt-3 animate-pulse">
                        {result?.confidence_result?.confidence_score}%
                    </div>

                </div>


                <div className="
                    bg-slate-950
                    border
                    border-cyan-500/20
                    rounded-2xl
                    p-5
                ">

                    <div className="text-slate-400 text-sm">
                        Operational Risk
                    </div>

                    <div className="text-4xl font-bold text-cyan-400 mt-3 animate-pulse">
                        {result?.confidence_result?.operational_risk}
                    </div>

                </div>


                <div className="
                    bg-slate-950
                    border
                    bborder-cyan-500/20
                    rounded-2xl
                    p-5
                ">

                    <div className="text-slate-400 text-sm">
                        Approval Recommendation
                    </div>

                    <div className="text-sm xl:text-lg font-bold text-green-400 mt-3 leading-6 break-words animate-pulse">
                        {
                            result?.confidence_result?.approval_recommendation === "SAFE_TO_EXECUTE"
                                ? "Approved for Autonomous Recovery"
                                : "Requires Human Escalation"
                        }
                    </div>

                </div>

            </div>

        </div>

    )
}