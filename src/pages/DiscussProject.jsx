import PageTransition from '../components/PageTransition';

export default function DiscussProject() {
    return (
        <PageTransition className="page bg-bg">
            <section className="relative border-b border-black/[0.06] bg-[#ecebe8]">
                <div className="mx-auto max-w-4xl px-6 py-28 sm:px-10 md:py-36">
                    <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.28em] text-text/45">
                        Studio Vortessa
                    </p>
                    <h1 className="mt-5 font-sans text-[clamp(2rem,5.5vw,3.6rem)] font-medium tracking-tight text-text">
                        discuss a project
                    </h1>
                    <div className="mt-7 h-px w-20 bg-[linear-gradient(90deg,rgba(184,146,74,0.65),transparent)]" />
                </div>
            </section>

            <section className="bg-bg">
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-2">
                    <article className="rounded-[18px] border border-black/10 bg-white/50 p-7 md:p-8">
                        <h2 className="font-sans text-2xl font-medium tracking-tight text-text">furniture inquiries</h2>
                        <p className="mt-5 font-sans text-[0.98rem] font-light leading-relaxed text-muted">
                            For pricing, materials, availability, and bespoke variations of pieces from the Studio
                            Vortessa collection.
                        </p>
                    </article>

                    <article className="rounded-[18px] border border-black/10 bg-white/50 p-7 md:p-8">
                        <h2 className="font-sans text-2xl font-medium tracking-tight text-text">
                            Commissions &amp; Collaborations
                        </h2>
                        <p className="mt-5 font-sans text-[0.98rem] font-light leading-relaxed text-muted">
                            For architectural projects, hospitality environments, and custom sculptural installations
                            developed in collaboration with the studio.
                        </p>
                    </article>
                </div>
            </section>
        </PageTransition>
    );
}
