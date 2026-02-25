import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 pb-24">
      {/* Hero Section Skeleton */}
      <section className="min-h-[90vh] flex items-center pt-20 md:pt-32">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column (Content) */}
          <div className="space-y-8">
            {/* Location Badge */}
            <Skeleton 
              className="h-8 w-32 rounded-full" 
              style={{ animationDelay: "0s" }} 
            />

            {/* Name/Title */}
            <div className="space-y-2">
              <Skeleton 
                className="h-12 sm:h-16 md:h-20 w-3/4 rounded-lg" 
                style={{ animationDelay: "0.1s" }} 
              />
              <Skeleton 
                className="h-12 sm:h-16 md:h-20 w-1/2 rounded-lg" 
                style={{ animationDelay: "0.2s" }} 
              />
            </div>

            {/* Role */}
            <Skeleton 
              className="h-8 w-48 rounded-md" 
              style={{ animationDelay: "0.3s" }} 
            />

            {/* Bio */}
            <div className="space-y-3 max-w-lg">
              <Skeleton 
                className="h-4 w-full" 
                style={{ animationDelay: "0.4s" }} 
              />
              <Skeleton 
                className="h-4 w-11/12" 
                style={{ animationDelay: "0.5s" }} 
              />
              <Skeleton 
                className="h-4 w-10/12" 
                style={{ animationDelay: "0.6s" }} 
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Skeleton 
                className="h-12 w-40 rounded-md" 
                style={{ animationDelay: "0.7s" }} 
              />
              <Skeleton 
                className="h-12 w-40 rounded-md" 
                style={{ animationDelay: "0.8s" }} 
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <Skeleton 
                className="h-6 w-6 rounded-full" 
                style={{ animationDelay: "0.9s" }} 
              />
              <Skeleton 
                className="h-6 w-6 rounded-full" 
                style={{ animationDelay: "1.0s" }} 
              />
            </div>
          </div>

          {/* Right Column (Stats) */}
          <div className="w-full lg:justify-self-end">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton 
                    className="h-16 w-full rounded-xl" 
                    style={{ animationDelay: `${1.1 + i * 0.1}s` }} 
                  />
                  <Skeleton 
                    className="h-4 w-20 rounded-md" 
                    style={{ animationDelay: `${1.2 + i * 0.1}s` }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Generic Section Placeholders (About, Skills, etc.) */}
      {[0, 1, 2].map((sectionIndex) => (
        <section key={sectionIndex} className="space-y-12">
          {/* Section Title */}
          <div className="flex flex-col items-center gap-4">
            <Skeleton 
              className="h-8 w-48 rounded-lg" 
              style={{ animationDelay: `${1.5 + sectionIndex * 0.2}s` }} 
            />
            <Skeleton 
              className="h-4 w-96 max-w-full rounded-md" 
              style={{ animationDelay: `${1.6 + sectionIndex * 0.2}s` }} 
            />
          </div>

          {/* Section Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((cardIndex) => (
              <Skeleton 
                key={cardIndex} 
                className="h-64 w-full rounded-xl" 
                style={{ animationDelay: `${1.7 + sectionIndex * 0.2 + cardIndex * 0.1}s` }} 
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
