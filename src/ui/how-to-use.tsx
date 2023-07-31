import HelpIcon from "./icons/icon-help";

const steps = [
  {
    content:
      "Fill in faction and user ID, choose up to four stats to display, and customize the banner to your liking.",
  },
  {
    content:
      "Copy the URL and add it to your TORN profile, forum signature, or anywhere else you want to show off your <u><strong>live banner</strong></u>.",
  },
];

const alternativeSteps = [
  {
    content:
      "Click on the <svg xmlns='http://www.w3.org/2000/svg' style='display: inline-block;' width='16' height='16' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'></path><path d='M8.813 11.612c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.986 4.986l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l.292 -.293l.106 -.095c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.674 4.675a4 4 0 0 1 -3.775 3.599l-.206 .005h-12a4 4 0 0 1 -3.98 -3.603l6.687 -6.69l.106 -.095zm9.187 -9.612a4 4 0 0 1 3.995 3.8l.005 .2v9.585l-3.293 -3.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-.307 .306l-2.293 -2.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-5.307 5.306v-9.585a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-2.99 5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z' stroke-width='0' fill='currentColor'></path></svg> icon to toggle the banner preview, then save the image directly to your system for a <u><strong>static banner</strong></u>.",
  },
];

export default function HowToUse() {
  return (
    <details className="text-sm">
      <summary className="group flex cursor-pointer items-center gap-1 py-1 font-semibold text-eminence-300 transition-colors duration-300 hover:text-eminence-200">
        <HelpIcon className="h-4 w-4" />
        <span>How to use</span>
      </summary>
      <div className="rounded-lg bg-eminence-900 px-3 py-2 text-eminence-100">
        <ul className="list-disc space-y-3 pl-5 marker:text-eminence-300">
          {steps.map((step, index) => (
            <li key={index}>
              <p dangerouslySetInnerHTML={{ __html: step.content }} />
            </li>
          ))}
          <li className="inline-flex w-full items-center justify-center">
            <hr className="my-2 h-px w-4/5 border-0 bg-eminence-400/50" />
            <span className="absolute left-1/2 -translate-x-1/2 select-none bg-eminence-900 px-3 font-bold uppercase tracking-widest text-eminence-200">
              or
            </span>
          </li>
          {alternativeSteps.map((step, index) => (
            <li key={index}>
              <p dangerouslySetInnerHTML={{ __html: step.content }} />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
