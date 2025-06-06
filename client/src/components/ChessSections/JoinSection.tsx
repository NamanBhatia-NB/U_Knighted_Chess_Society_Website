import JoinForm from "@/components/forms/JoinForm";

export default function JoinSection() {
  return (
    <section id="join" className="py-20 md:py-32 relative bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="scrolled-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 bg-transparent">Join Our Chess Society</h2>
            <p className="mb-6 text-lg text-black/80">Become part of a thriving chess community where you can improve your game, participate in tournaments, and connect with fellow enthusiasts.</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
                  <i className="ri-trophy-line text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg bg-transparent">Competitive Opportunities</h3>
                  <p className='text-black/80'>Regular tournaments with players of all skill levels</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
                  <i className="ri-book-open-line text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg bg-transparent">Expert Instruction</h3>
                  <p className='text-black/80'>Workshops and coaching from experienced players</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
                  <i className="ri-group-line text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg bg-transparent">Social Community</h3>
                  <p className='text-black/80'>Make friends and connections with fellow chess enthusiasts</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-semibold text-primary/90">Membership Fee:</span>
              <span className="text-xl font-bold">$25 per semester</span>
            </div>
          </div>

          <div className="glass rounded-xl p-8 shadow-lg scrolled-fade-in">
            <JoinForm />
          </div>
        </div>
      </div>
    </section>
  );
}
