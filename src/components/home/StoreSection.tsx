import { MapPreview } from "@/components/store/MapPreview";
import { OpenHours, OpenStateBadge } from "@/components/store/OpenHours";
import { RevealText } from "@/components/animations/RevealText";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/Section";
import { storeInfo } from "@/lib/data/store";
import { formatTime } from "@/lib/utils";

/**
 * Store section — this is a physical shop, and the page should say so with the
 * same confidence it shows products. Address, today's hours, the full week, and
 * a designed location diagram.
 */
export function StoreSection() {
  return (
    <section
      id="store"
      className="relative bg-paper py-20 text-ink sm:py-28 lg:py-32"
      aria-labelledby="store-heading"
    >
      <div className="shell">
        <SectionLabel index="07" tone="light">
          The store
        </SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Statement + hours */}
          <div className="lg:col-span-5">
            <h2 id="store-heading" className="sr-only">
              Visit Star Mobiles in Puliyakulam, Coimbatore
            </h2>
            <RevealText
              as="p"
              lines={["COME SEE", "US IN"]}
              className="type-display-l text-ink"
            />
            <RevealText
              as="p"
              lines={["PULIYAKULAM."]}
              className="type-display-l text-signal"
              delay={0.12}
            />

            <Reveal className="mt-10 flex flex-col gap-8">
              <div className="border-t border-hair-light pt-5">
                <p className="type-label-xs text-ash">Address</p>
                <address className="mt-4 not-italic">
                  <p className="type-body-lg text-ink">
                    {storeInfo.address.line1}
                    <br />
                    {storeInfo.address.line2}
                    <br />
                    {storeInfo.address.locality}, {storeInfo.address.city} —{" "}
                    {storeInfo.address.postalCode}
                    <br />
                    <span className="text-ash">{storeInfo.address.region}</span>
                  </p>
                </address>
                <p className="type-label-xs mt-4 leading-[1.9] text-ash/70">
                  {storeInfo.address.sourceLabel}
                </p>
              </div>

              <div className="border-t border-hair-light pt-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="type-label-xs text-ash">Opening hours</p>
                  <OpenStateBadge className="type-label-xs inline-flex items-center gap-2 text-ash" />
                </div>

                <table className="mt-5 w-full border-collapse">
                  <caption className="sr-only">Weekly opening hours</caption>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="type-label-xs border-b border-hair-light pb-3 text-left font-normal text-ash/70"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="type-label-xs border-b border-hair-light pb-3 text-right font-normal text-ash/70"
                      >
                        Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeInfo.hours.weekly.map((row) => (
                      <tr key={row.day}>
                        <th
                          scope="row"
                          className="type-body border-b border-hair-light/60 py-3 text-left font-normal text-ink"
                        >
                          {row.day}
                        </th>
                        <td className="type-figure border-b border-hair-light/60 py-3 text-right text-[0.8125rem] text-ink">
                          {row.open && row.close
                            ? `${formatTime(row.open)} – ${formatTime(row.close)}`
                            : "Closed"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="type-body mt-6 text-ash">
                  Today: <span className="text-ink"><OpenHours /></span>
                </p>
                <p className="type-label-xs mt-3 leading-[1.9] text-ash/70">
                  {storeInfo.hours.note}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Location */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <MapPreview tone="light" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
