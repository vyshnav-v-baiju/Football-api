export default function SectionTitle({ children, right = null }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4 sm:mb-[30px]">
      <div className="title-accent relative min-w-0 pl-5 sm:pl-[30px]">
        <h2 className="m-0 text-[20px] font-bold text-white">{children}</h2>
      </div>
      {right}
    </div>
  )
}
