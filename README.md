# Parsimony

To start Application: `yarn start`

## Professional Project Statement: Parsimony

**Parsimony** takes its name from the scientific principle of parsimony, also known as Occam's razor—the idea that the
simplest solution is often the best one. This philosophy guided our entire approach: instead of building a complex,
feature-heavy system, we focused on creating a clean, intuitive tool that solved real problems without unnecessary
complexity.

This behavioral tracking app I built with my sister reflects that principle perfectly. My sister is a Board Certified
Behavior Analyst (BCBA), and she was seeing gaps in how schools were tracking student behaviors and progress. We decided
to team up and build something that could actually make a difference.

### What We Built

Parsimony helps teachers and behavior analysts track behaviors, collect data, and monitor student progress in real time.
For kids on the autism spectrum, this kind of systematic tracking is crucial for effective interventions. My sister knew
exactly what features were needed because she was living with these challenges every day in her work.

### Real-World Testing

We weren't just building something in theory—my sister used Parsimony in her school for a full year. Having her as both
our user and expert meant we could quickly fix issues, add features that actually mattered, and make sure the app worked
in the real world. She'd come home with feedback from using it that day, and I'd implement improvements based on what
she and her colleagues actually needed.

### Working with My Sister

This project was special because it combined my sister's deep knowledge of autism interventions with my coding skills.
She understood the clinical side—what data needed to be collected, how it should be organized, what would actually help
the kids—while I handled the technical implementation. It was one of those rare projects where the person asking for the
features truly understood why they were important.

### The Code

I'm genuinely proud of the codebase we created. True to our parsimony principle, it's clean and focused rather than
bloated with unnecessary features. This was my first fully deployed end-to-end application, and I learned a tremendous
amount building it from the ground up. I implemented multi-tenant database support so multiple schools could use the
system while keeping their data completely isolated and secure—something that was crucial given we were handling
sensitive student information.

One of the most interesting challenges was designing UX that could capture real-time behavioral data without disrupting
the teacher's focus on their students. We solved this with things like one-tap incident logging, smart auto-save
functionality, and intuitive gesture-based inputs that let teachers record behaviors quickly without taking their eyes
off the children for long. The interface had to work seamlessly during actual classroom situations, not just in ideal
testing conditions.

For deployment, I used AWS Fargate, which let me focus on the application code rather than managing servers. The
containerized approach made scaling seamless and gave us the reliability we needed for production use. I also
implemented comprehensive testing throughout the stack, which was essential since my sister was relying on this system
for her daily work with students.

It had to be reliable since it was handling important data about real students, and it needed to be intuitive enough for
busy teachers and therapists to use without getting in their way. The architecture reflects the practical needs my
sister identified, not just theoretical best practices.

### Where Things Stand

We stopped active development when my sister got an amazing opportunity to work for a company doing similar work in the
field. While I miss our collaboration, I'm incredibly proud of what we built together and the impact it had on her
students during that year. Seeing her professional growth and knowing our app played a small part in helping kids with
autism is something I'll always be proud of.

This remains one of my favorite projects—not just because of the code, but because of what it represented: building
something meaningful with my sister that actually helped real kids, all while staying true to the principle that gave it
its name. As my first complete production application, it taught me invaluable lessons about building software that real
people depend on.

---