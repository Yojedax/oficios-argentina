from pathlib import Path

replacements = {
    "src/app/layout.tsx": {
        "import Header from '@/components/layout/Header';": "import { Header } from '@/components/layout/Header';",
        "import Footer from '@/components/layout/Footer';": "import { Footer } from '@/components/layout/Footer';",
    },
    "src/app/page.tsx": {
        "import HeroSection from '@/components/home/HeroSection';": "import { HeroSection } from '@/components/home/HeroSection';",
        "import CategoryGrid from '@/components/home/CategoryGrid';": "import { CategoryGrid } from '@/components/home/CategoryGrid';",
        "import FeaturedProfessionals from '@/components/home/FeaturedProfessionals';": "import { FeaturedProfessionals } from '@/components/home/FeaturedProfessionals';",
        "import HowItWorks from '@/components/home/HowItWorks';": "import { HowItWorks } from '@/components/home/HowItWorks';",
    },
    "src/app/not-found.tsx": {
        "import SearchBar from '@/components/search/SearchBar';": "import { SearchBar } from '@/components/search/SearchBar';",
    },
    "src/app/(public)/oficios/page.tsx": {
        "import CategoryGrid from '@/components/home/CategoryGrid';": "import { CategoryGrid } from '@/components/home/CategoryGrid';",
    },
    "src/app/(public)/buscar/page.tsx": {
        "import SearchBar from '@/components/search/SearchBar';": "import { SearchBar } from '@/components/search/SearchBar';",
        "import ProfessionalCard from '@/components/profesionales/ProfessionalCard';": "import { ProfessionalCard } from '@/components/profesionales/ProfessionalCard';",
    },
    "src/app/(public)/oficios/[slug]/page.tsx": {
        "import ProfessionalCard from '@/components/profesionales/ProfessionalCard';": "import { ProfessionalCard } from '@/components/profesionales/ProfessionalCard';",
        "import Pagination from '@/components/ui/Pagination';": "import { Pagination } from '@/components/ui/Pagination';",
        "{professionals.length > 0 ? (": "{(professionals || []).length > 0 ? (",
        "{professionals.map((professional) => (": "{(professionals || []).map((professional) => (",
    },
    "src/app/(public)/profesional/[slug]/page.tsx": {
        "import ReviewList from '@/components/profesionales/ReviewList';": "import { ReviewList } from '@/components/profesionales/ReviewList';",
        "import ContactButtons from '@/components/profesionales/ContactButtons';": "import { ContactButtons } from '@/components/profesionales/ContactButtons';",
    },
}

for file, reps in replacements.items():
    p = Path(file)
    if not p.exists():
        print(f"No existe: {file}")
        continue
    text = p.read_text()
    for old, new in reps.items():
        text = text.replace(old, new)

    # sacar onChange del select en oficios/[slug]
    text = text.replace("""                    onChange={(e) => {
                      const form = e.target.closest('form');
                      if (form) form.submit();
                    }}
""", "")

    p.write_text(text)
    print(f"OK: {file}")

# Asegurar que componentes interactivos sean client
for file in Path("src/components").rglob("*.tsx"):
    text = file.read_text()
    if any(x in text for x in ["onClick=", "onChange=", "onSubmit=", "useState", "useEffect", "useRef", "useRouter"]):
        if not text.startswith('"use client";') and not text.startswith("'use client';"):
            file.write_text('"use client";\n\n' + text)
            print(f"use client agregado: {file}")

print("Listo.")
