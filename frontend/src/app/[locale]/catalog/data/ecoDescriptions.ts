// src/app/[locale]/catalog/data/ecoDescriptions.ts

// Об'єкт з еко-описами для кожної категорії
// Ці значення тепер є ключами для перекладу
export const ecoDescriptions: Record<string, {
  titleKey: string;
  descriptionKey: string;
  materials: Array<{ nameKey: string; value: number; descKey: string }>
}> = {
  't-shirts': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.linenDenim.name",
        value: 20,
        descKey: "materials.linenDenim.desc"
      },
      {
        nameKey: "materials.recycledCotton.name",
        value: 50,
        descKey: "materials.recycledCotton.desc"
      },
      {
        nameKey: "materials.bambooFabric.name",
        value: 30,
        descKey: "materials.bambooFabric.desc"
      }
    ]
  },
  'shirts': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.linenDenim.name",
        value: 20,
        descKey: "materials.linenDenim.desc"
      },
      {
        nameKey: "materials.linen.name",
        value: 50,
        descKey: "materials.linen.desc"
      },
      {
        nameKey: "materials.recycledViscoseTextile.name",
        value: 30,
        descKey: "materials.recycledViscoseTextile.desc"
      }
    ]
  },
  'jeans': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.organicDenim.name",
        value: 50,
        descKey: "materials.organicDenim.desc"
      },
      {
        nameKey: "materials.stretchDenim.name",
        value: 15,
        descKey: "materials.stretchDenim.desc"
      },
      {
        nameKey: "materials.recycledDenim.name",
        value: 35,
        descKey: "materials.recycledDenim.desc"
      }
    ]
  },
  'jackets': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.hempFabric.name",
        value: 20,
        descKey: "materials.hempFabric.desc"
      },
      {
        nameKey: "materials.waxedCotton.name",
        value: 50,
        descKey: "materials.waxedCotton.desc"
      },
      {
        nameKey: "materials.bioplastic.name",
        value: 30,
        descKey: "materials.bioplastic.desc"
      }
    ]
  },
  'bags': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.bamboo.name",
        value: 30,
        descKey: "materials.bamboo.desc"
      },
      {
        nameKey: "materials.recycledPlastic.name",
        value: 70,
        descKey: "materials.recycledPlastic.desc"
      }
    ]
  },
  'glasses': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.glass.name",
        value: 30,
        descKey: "materials.glass.desc"
      },
      {
        nameKey: "materials.recycledPlastic.name",
        value: 70,
        descKey: "materials.recycledPlastic.desc"
      }
    ]
  },
  'hats': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.hempFabric.name",
        value: 25,
        descKey: "materials.hempFabric.desc"
      },
      {
        nameKey: "materials.linenDenim.name",
        value: 60,
        descKey: "materials.linenDenim.desc"
      },
      {
        nameKey: "materials.recycledViscoseTextile.name",
        value: 15,
        descKey: "materials.recycledViscoseTextile.desc"
      }
    ]
  },
  'tops': {
    titleKey: "recyclingProcessTitle",
    descriptionKey: "recyclingProcessDescription",
    materials: [
      {
        nameKey: "materials.hempFabric.name",
        value: 25,
        descKey: "materials.hempFabric.desc"
      },
      {
        nameKey: "materials.linenDenim.name",
        value: 60,
        descKey: "materials.linenDenim.desc"
      },
      {
        nameKey: "materials.recycledViscoseTextile.name",
        value: 15,
        descKey: "materials.recycledViscoseTextile.desc"
      }
    ]
  }
};

// Функція для отримання категорії товару (залишається без змін)
export const getCategoryKey = (category: string | undefined) => {
  if (!category) return 't-shirts';
  const lowerCaseCategory = category.toLowerCase();

  if (lowerCaseCategory.includes('t-shirt') || lowerCaseCategory.includes('футбол')) {
    return 't-shirts';
  } else if (lowerCaseCategory.includes('shirt') || lowerCaseCategory.includes('сороч')) {
    return 'shirts';
  } else if (lowerCaseCategory.includes('jeans') || lowerCaseCategory.includes('джинс')) {
    return 'jeans';
  } else if (lowerCaseCategory.includes('jacket') || lowerCaseCategory.includes('курт')) {
    return 'jackets';
  } else if (lowerCaseCategory.includes('bag') || lowerCaseCategory.includes('сумк')) {
    return 'bags';
  } else if (lowerCaseCategory.includes('glass') || lowerCaseCategory.includes('окуляр')) {
    return 'glasses';
  } else if (lowerCaseCategory.includes('hat') || lowerCaseCategory.includes('капелюх') || lowerCaseCategory.includes('шапк')) {
    return 'hats';
  } else if (lowerCaseCategory.includes('top') || lowerCaseCategory.includes('топ')) {
    return 'tops';
  }

  return 't-shirts'; // default
};