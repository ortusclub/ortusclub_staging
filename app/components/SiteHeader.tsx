"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavItem =
  | { label: string; href: string }
  | { label: string; href?: string; children: { label: string; href: string; group?: string }[] };

const nav: NavItem[] = [
  {
    label: "EVENTS",
    children: [
      { label: "Roundtables", href: "/roundtables/" },
      { label: "Masterclasses", href: "/masterclasses-and-panels/" },
      { label: "Virtual Events", href: "/virtual-events/" },
      { label: "Large-Scale Events & Summits", href: "/summits-and-large-scale/" },
      { label: "Partner Events", href: "/partner-events/" },
    ],
  },
  {
    label: "ABOUT",
    children: [
      { label: "About The Ortus Club", href: "/about-us/" },
      { label: "Our Moderators", href: "/moderator/" },
      { label: "FAQs", href: "/frequently-asked-questions/" },
    ],
  },
  {
    label: "RESOURCES",
    children: [
      { label: "Marketing Leaders Community", href: "/marketing-leaders/", group: "Marketing Hub" },
      { label: "Join a Marketing Event", href: "/join-a-marketing-event/", group: "Marketing Hub" },
      { label: "CMO Chats", href: "/cmo-chats/", group: "Marketing Hub" },
      { label: "B2B Marketing Playbook", href: "/the-2026-event-marketers-playbook/", group: "Marketing Hub" },
      { label: "Subscribe to our Newsletter", href: "/newsletter/", group: "Marketing Hub" },
      { label: "Event Highlights", href: "/event-highlights/", group: "Event Highlights" },
    ],
  },
  { label: "CONTACT US", href: "/contact-us/" },
];

export default function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="flex items-center justify-between px-6 lg:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="The Ortus Club home">
            <Image
              src="https://www.ortusclub.com/wp-content/uploads/2021/04/image-1.png"
              alt="The Ortus Club"
              width={100}
              height={32}
              style={{ objectFit: "contain", height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" onMouseLeave={() => setOpenDropdown(null)}>
            {nav.map((item) => {
              const hasChildren = "children" in item && item.children;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="text-white text-sm tracking-wider hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                >
                  <button
                    type="button"
                    className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label} <span className="text-xs">▾</span>
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                      <div className="bg-black border border-white/10 rounded-md py-3 min-w-[260px] shadow-lg">
                        {/* Group by `group` if present */}
                        {groupChildren(item.children!).map((group) => (
                          <div key={group.title} className="px-2">
                            {group.title && (
                              <div className="text-white/50 text-[10px] tracking-widest px-3 pt-2 pb-1">
                                {group.title.toUpperCase()}
                              </div>
                            )}
                            {group.items.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-3 py-2 text-white text-sm hover:bg-white/5 rounded"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/contact-us/"
              className="text-white text-sm tracking-wider border border-white rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
            >
              BOOK A MEETING
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            className="lg:hidden text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="lg:hidden bg-black border-t border-white/10 max-h-[80vh] overflow-y-auto">
            <nav className="px-6 py-4 flex flex-col">
              {nav.map((item) => {
                const hasChildren = "children" in item && item.children;
                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className="text-white text-sm tracking-wider py-3 border-b border-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <details key={item.label} className="border-b border-white/5">
                    <summary className="text-white text-sm tracking-wider py-3 cursor-pointer list-none flex justify-between items-center">
                      {item.label} <span className="text-xs">▾</span>
                    </summary>
                    <div className="pl-4 pb-2">
                      {groupChildren(item.children!).map((group) => (
                        <div key={group.title}>
                          {group.title && (
                            <div className="text-white/40 text-[10px] tracking-widest pt-2 pb-1">
                              {group.title.toUpperCase()}
                            </div>
                          )}
                          {group.items.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2 text-white/90 text-sm"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </details>
                );
              })}
              <Link
                href="/contact-us/"
                className="mt-4 text-center text-white text-sm tracking-wider border border-white rounded-full px-5 py-3 hover:bg-white hover:text-black transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                BOOK A MEETING
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

function groupChildren(children: { label: string; href: string; group?: string }[]) {
  const groups: { title: string; items: typeof children }[] = [];
  for (const c of children) {
    const g = c.group || "";
    let bucket = groups.find((x) => x.title === g);
    if (!bucket) {
      bucket = { title: g, items: [] };
      groups.push(bucket);
    }
    bucket.items.push(c);
  }
  return groups;
}
