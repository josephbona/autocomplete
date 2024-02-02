import { SearchInput } from "@/components/search-input"

export default function IndexPage() {
  return (
    <section className="md:py-10 container grid items-center gap-6 pt-6 pb-8">
      <h1 className="md:text-4xl text-3xl font-extrabold leading-tight tracking-tighter">
        Autocomplete...
      </h1>
      <SearchInput />
    </section>
  )
}
