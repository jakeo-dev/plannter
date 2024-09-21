// home page; maybe something should be added here instead of just going to the coursework section...like an overview of everything maybe or a tutorial on how to use the website or some other landing page thing idk

import CommonHead from "@/components/CommonHead";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/coursework");
  }, [router]);

  return (
    <CommonHead>
      <meta
        name="keywords"
        content="plannter, planter, high school, college, colleges, application, applications, college application, college applications, college app, college apps, common app, school, schools, course, courses, extracurricular, extracurriculars, activity, activities, test, tests, exam, exams, essay, essays, college app help, college application help, course tracker, manage courses, college tracker, extracurricular tracker, activity tracker, manage extracurriculars, manage activities"
      />
      <meta
        property="description"
        content="Plan courses, keep track of activities, prepare for college applications, and more."
      />

      <meta property="og:title" content="Plannter" />
      <meta
        property="og:description"
        content="Plan courses, keep track of activities, prepare for college applications, and more."
      />
      <meta name="theme-color" content="#16a34a" />
      <meta property="og:image" content="plannter-favicon.png" />
      <meta property="og:url" content="https://plannter.jakeo.dev" />

      <meta name="twitter:card" content="plannter-favicon.png" />
      <meta name="twitter:title" content="Plannter" />
      <meta
        name="twitter:description"
        content="Plan courses, keep track of activities, prepare for college applications, and more."
      />
      <meta name="twitter:image" content="plannter-favicon.png" />
      <meta name="twitter:url" content="https://plannter.jakeo.dev" />
    </CommonHead>
  );
}
