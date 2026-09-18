import { Link } from 'react-router-dom'
import { HandHeart, MapPinned, ShieldCheck, FileBarChart, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'

export default function AboutPage() {
  return (
    <div>
      {/* Hero filosofi */}
      <section className="border-b border-sand-200/70 bg-white">
        <div className="container-app grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow">Tentang Ambil Bagian</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-sand-950 md:text-5xl">
              "Kamu nggak harus bantu semuanya.
              <br />
              <span className="text-brand-700">Cukup ambil bagian."</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-600">
              Banyak orang ingin membantu tapi merasa bantuannya terlalu kecil. Padahal kebutuhan nyata di sekitar kita
              jarang butuh satu penyelamat — mereka butuh banyak orang yang mau ambil bagian, berapa pun andilnya.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-sand-600">
              Ambil Bagian ada untuk mempertemukan <strong className="text-sand-900">kebutuhan nyata</strong> dengan{' '}
              <strong className="text-sand-900">orang yang mau ikut membantu</strong> — dengan peta, progress yang jujur,
              dan bukti yang terbuka.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/kebutuhan" className="btn-primary btn-lg">
                Mulai dari peta kebutuhan <ArrowRight size={16} />
              </Link>
              <Link to="/cara-kerja" className="btn-ghost btn-lg">
                Pelajari cara kerjanya
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-brand-900 p-8">
            <HandHeart size={30} className="text-brand-200" />
            <p className="mt-4 font-display text-2xl font-semibold leading-snug text-white">
              "Berapa pun yang kamu bisa bantu, itu sangat berarti."
            </p>
            <p className="mt-4 text-sm leading-relaxed text-sand-200">
              Ini bukan sekadar tagline. Ini cara kerja platform: kebutuhan dipecah jadi angka yang bisa dipenuhi banyak
              orang, bukan ditanggung satu donatur besar.
            </p>
          </div>
        </div>
      </section>

      {/* Prinsip */}
      <section className="container-app py-14 md:py-16">
        <SectionHeading eyebrow="Prinsip Platform" title="Terbuka, tidak terkunci pada satu organisasi">
          Ambil Bagian dirancang sebagai platform terbuka. Siapa pun bisa melihat kebutuhan, siapa pun yang lolos
          verifikasi bisa menjadi mitra pelaksana, dan setiap laporan bisa dilihat publik.
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: MapPinned,
              title: 'Dari peta, untuk wilayah nyata',
              text: 'Kebutuhan selalu terikat titik dan komunitas nyata — dimulai dari Bojonegoro, terbuka untuk seluruh Indonesia.',
            },
            {
              icon: ShieldCheck,
              title: 'Verifikasi sebelum tampil',
              text: 'Tidak ada kebutuhan yang bisa menerima bantuan tanpa dicek tim lapangan. Angka besar bukan bukti — survei yang jadi bukti.',
            },
            {
              icon: FileBarChart,
              title: 'Bukti di setiap tahap',
              text: 'Foto, nota, dan catatan distribusi melekat pada setiap kebutuhan. Selesai berarti ada laporannya.',
            },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl border border-sand-200/80 bg-white p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-700/10 text-brand-800">
                <p.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-sand-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-600">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-sand-200 bg-sand-100/70 p-4 text-xs leading-relaxed text-sand-600">
          Catatan: prototype ini memakai mock data fiktif. Tampilnya nama organisasi mana pun (mis. Lazismu) hanya sebagai
          contoh ilustrasi mitra — bukan klaim afiliasi, kerja sama, atau dukungan.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-brand-900">
        <div className="container-app py-14 text-center md:py-16">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            Kamu juga bisa ambil bagian!
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sand-200">
            Mulai dari yang paling kecil. Seperti yang selalu kami bilang — berapa pun yang kamu bisa bantu, itu sangat berarti.
          </p>
          <Link to="/kebutuhan" className="btn-primary btn-lg mt-7">
            Lihat Kebutuhan Sekarang
          </Link>
        </div>
      </section>
    </div>
  )
}
