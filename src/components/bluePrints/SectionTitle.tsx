interface sectionTitleProps{
    name:string
}

function SectionTitle({name}:sectionTitleProps) {
  return (
    <h2 className="text-white text-3xl uppercase mb-4 mx-4 lg:mx-8">{name}</h2>
)
}

export default SectionTitle