const STORAGE_KEYS = {
  favorites: 'codex:favorites',
  history: 'codex:history',
  theme: 'codex:theme'
};

const unitCategories = {
  length: {
    label: 'Length',
    icon: '📏',
    description: 'Miles, kilometers, inches, centimeters, and steps.',
    type: 'linear',
    base: 'meter',
    rank: ['meter', 'kilometer', 'mile', 'foot', 'yard', 'centimeter', 'inch', 'millimeter', 'nautical-mile', 'step'],
    units: {
      meter: {
        label: 'Meter',
        symbol: 'm',
        multiplier: 1,
        synonyms: ['m', 'meter', 'meters', 'metre', 'metres']
      },
      kilometer: {
        label: 'Kilometer',
        symbol: 'km',
        multiplier: 1000,
        synonyms: ['km', 'kilometer', 'kilometers', 'kilometre', 'kilometres']
      },
      centimeter: {
        label: 'Centimeter',
        symbol: 'cm',
        multiplier: 0.01,
        synonyms: ['cm', 'centimeter', 'centimeters', 'centimetre', 'centimetres']
      },
      millimeter: {
        label: 'Millimeter',
        symbol: 'mm',
        multiplier: 0.001,
        synonyms: ['mm', 'millimeter', 'millimeters', 'millimetre', 'millimetres']
      },
      inch: {
        label: 'Inch',
        symbol: 'in',
        multiplier: 0.0254,
        synonyms: ['inch', 'inches', 'in']
      },
      foot: {
        label: 'Foot',
        symbol: 'ft',
        multiplier: 0.3048,
        synonyms: ['foot', 'feet', 'ft']
      },
      yard: {
        label: 'Yard',
        symbol: 'yd',
        multiplier: 0.9144,
        synonyms: ['yard', 'yards', 'yd']
      },
      mile: {
        label: 'Mile',
        symbol: 'mi',
        multiplier: 1609.344,
        synonyms: ['mile', 'miles', 'mi']
      },
      'nautical-mile': {
        label: 'Nautical mile',
        symbol: 'nmi',
        multiplier: 1852,
        synonyms: ['nautical mile', 'nautical miles', 'nmi']
      },
      step: {
        label: 'Step',
        symbol: 'steps',
        multiplier: 0.762,
        synonyms: ['step', 'steps']
      }
    },
    examples: ['5 miles to km', '2000 steps to km', '12 ft to m']
  },
  weight: {
    label: 'Weight',
    icon: '⚖️',
    description: 'Grams, kilograms, ounces, pounds, and stones.',
    type: 'linear',
    base: 'gram',
    rank: ['gram', 'kilogram', 'pound', 'ounce', 'milligram', 'stone'],
    units: {
      gram: {
        label: 'Gram',
        symbol: 'g',
        multiplier: 1,
        synonyms: ['g', 'gram', 'grams']
      },
      kilogram: {
        label: 'Kilogram',
        symbol: 'kg',
        multiplier: 1000,
        synonyms: ['kg', 'kilogram', 'kilograms', 'kilo', 'kilos']
      },
      milligram: {
        label: 'Milligram',
        symbol: 'mg',
        multiplier: 0.001,
        synonyms: ['mg', 'milligram', 'milligrams']
      },
      ounce: {
        label: 'Ounce',
        symbol: 'oz',
        multiplier: 28.3495231,
        synonyms: ['ounce', 'ounces', 'oz']
      },
      pound: {
        label: 'Pound',
        symbol: 'lb',
        multiplier: 453.59237,
        synonyms: ['pound', 'pounds', 'lb', 'lbs']
      },
      stone: {
        label: 'Stone',
        symbol: 'st',
        multiplier: 6350.29318,
        synonyms: ['stone', 'stones', 'st']
      }
    },
    examples: ['2.5 kg to lb', '12 oz to g']
  },
  volume: {
    label: 'Volume',
    icon: '🧪',
    description: 'Milliliters, liters, teaspoons, tablespoons, cups.',
    type: 'linear',
    base: 'liter',
    rank: ['liter', 'milliliter', 'cup', 'tablespoon', 'teaspoon', 'fluid-ounce', 'pint', 'quart', 'gallon'],
    units: {
      liter: {
        label: 'Liter',
        symbol: 'L',
        multiplier: 1,
        synonyms: ['l', 'liter', 'liters', 'litre', 'litres']
      },
      milliliter: {
        label: 'Milliliter',
        symbol: 'mL',
        multiplier: 0.001,
        synonyms: ['ml', 'milliliter', 'milliliters', 'millilitre', 'millilitres']
      },
      teaspoon: {
        label: 'Teaspoon',
        symbol: 'tsp',
        multiplier: 0.00492892,
        synonyms: ['teaspoon', 'teaspoons', 'tsp']
      },
      tablespoon: {
        label: 'Tablespoon',
        symbol: 'tbsp',
        multiplier: 0.0147868,
        synonyms: ['tablespoon', 'tablespoons', 'tbsp']
      },
      'fluid-ounce': {
        label: 'Fluid ounce',
        symbol: 'fl oz',
        multiplier: 0.0295735,
        synonyms: ['fluid ounce', 'fluid ounces', 'fl oz', 'floz']
      },
      cup: {
        label: 'Cup',
        symbol: 'cup',
        multiplier: 0.236588,
        synonyms: ['cup', 'cups']
      },
      pint: {
        label: 'Pint',
        symbol: 'pt',
        multiplier: 0.473176,
        synonyms: ['pint', 'pints', 'pt']
      },
      quart: {
        label: 'Quart',
        symbol: 'qt',
        multiplier: 0.946353,
        synonyms: ['quart', 'quarts', 'qt']
      },
      gallon: {
        label: 'Gallon',
        symbol: 'gal',
        multiplier: 3.78541,
        synonyms: ['gallon', 'gallons', 'gal']
      }
    },
    examples: ['3 tbsp to ml', '1 gallon to liters']
  },
  temperature: {
    label: 'Temperature',
    icon: '🌡️',
    description: 'Celsius, Fahrenheit, Kelvin, oven presets.',
    type: 'temperature',
    base: 'celsius',
    rank: ['celsius', 'fahrenheit', 'kelvin'],
    units: {
      celsius: {
        label: 'Celsius',
        symbol: '°C',
        toBase: (value) => value,
        fromBase: (value) => value,
        synonyms: ['c', '°c', 'celsius', 'degc', 'deg c', 'celcius']
      },
      fahrenheit: {
        label: 'Fahrenheit',
        symbol: '°F',
        toBase: (value) => (value - 32) * (5 / 9),
        fromBase: (value) => (value * 9) / 5 + 32,
        synonyms: ['f', '°f', 'fahrenheit', 'degf', 'deg f']
      },
      kelvin: {
        label: 'Kelvin',
        symbol: 'K',
        toBase: (value) => value - 273.15,
        fromBase: (value) => value + 273.15,
        synonyms: ['k', 'kelvin']
      }
    },
    examples: ['350 f to c', '22 c to f']
  },
  data: {
    label: 'Data',
    icon: '💾',
    description: 'Bits, bytes, KB, MB, GB, TB, plus binary units.',
    type: 'linear',
    base: 'byte',
    rank: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'kibibyte', 'mebibyte', 'gibibyte', 'tebibyte', 'bit'],
    units: {
      bit: {
        label: 'Bit',
        symbol: 'bit',
        multiplier: 0.125,
        synonyms: ['bit', 'bits']
      },
      byte: {
        label: 'Byte',
        symbol: 'B',
        multiplier: 1,
        synonyms: ['byte', 'bytes', 'b']
      },
      kilobyte: {
        label: 'Kilobyte',
        symbol: 'KB',
        multiplier: 1000,
        synonyms: ['kb', 'kilobyte', 'kilobytes']
      },
      megabyte: {
        label: 'Megabyte',
        symbol: 'MB',
        multiplier: 1_000_000,
        synonyms: ['mb', 'megabyte', 'megabytes']
      },
      gigabyte: {
        label: 'Gigabyte',
        symbol: 'GB',
        multiplier: 1_000_000_000,
        synonyms: ['gb', 'gigabyte', 'gigabytes']
      },
      terabyte: {
        label: 'Terabyte',
        symbol: 'TB',
        multiplier: 1_000_000_000_000,
        synonyms: ['tb', 'terabyte', 'terabytes']
      },
      kibibyte: {
        label: 'Kibibyte',
        symbol: 'KiB',
        multiplier: 1024,
        synonyms: ['kib', 'kibibyte', 'kibibytes']
      },
      mebibyte: {
        label: 'Mebibyte',
        symbol: 'MiB',
        multiplier: 1024 ** 2,
        synonyms: ['mib', 'mebibyte', 'mebibytes']
      },
      gibibyte: {
        label: 'Gibibyte',
        symbol: 'GiB',
        multiplier: 1024 ** 3,
        synonyms: ['gib', 'gibibyte', 'gibibytes']
      },
      tebibyte: {
        label: 'Tebibyte',
        symbol: 'TiB',
        multiplier: 1024 ** 4,
        synonyms: ['tib', 'tebibyte', 'tebibytes']
      }
    },
    examples: ['1024 mb to gb', '512 mib to mb']
  },
  bandwidth: {
    label: 'Throughput',
    icon: '🚀',
    description: 'Bits per second, Mbps, Gbps for network speeds.',
    type: 'linear',
    base: 'bps',
    rank: ['bps', 'kbps', 'mbps', 'gbps'],
    units: {
      bps: {
        label: 'Bit per second',
        symbol: 'bps',
        multiplier: 1,
        synonyms: ['bps', 'bit per second', 'bits per second']
      },
      kbps: {
        label: 'Kilobit per second',
        symbol: 'kbps',
        multiplier: 1000,
        synonyms: ['kbps', 'kilobit per second', 'kilobits per second']
      },
      mbps: {
        label: 'Megabit per second',
        symbol: 'Mbps',
        multiplier: 1_000_000,
        synonyms: ['mbps', 'megabit per second', 'megabits per second']
      },
      gbps: {
        label: 'Gigabit per second',
        symbol: 'Gbps',
        multiplier: 1_000_000_000,
        synonyms: ['gbps', 'gigabit per second', 'gigabits per second']
      }
    },
    examples: ['100 mbps to gbps', '250 mbps to kbps']
  },
  energy: {
    label: 'Energy',
    icon: '⚡',
    description: 'Joules, calories, watt-hours, and kilowatt-hours.',
    type: 'linear',
    base: 'joule',
    rank: ['joule', 'kilojoule', 'calorie', 'kilocalorie', 'watt-hour', 'kilowatt-hour'],
    units: {
      joule: {
        label: 'Joule',
        symbol: 'J',
        multiplier: 1,
        synonyms: ['joule', 'joules', 'j']
      },
      kilojoule: {
        label: 'Kilojoule',
        symbol: 'kJ',
        multiplier: 1000,
        synonyms: ['kj', 'kilojoule', 'kilojoules']
      },
      calorie: {
        label: 'Calorie',
        symbol: 'cal',
        multiplier: 4.184,
        synonyms: ['cal', 'calorie', 'calories']
      },
      kilocalorie: {
        label: 'Kilocalorie',
        symbol: 'kcal',
        multiplier: 4184,
        synonyms: ['kcal', 'kilocalorie', 'kilocalories']
      },
      'watt-hour': {
        label: 'Watt hour',
        symbol: 'Wh',
        multiplier: 3600,
        synonyms: ['wh', 'watt hour', 'watt hours']
      },
      'kilowatt-hour': {
        label: 'Kilowatt hour',
        symbol: 'kWh',
        multiplier: 3_600_000,
        synonyms: ['kwh', 'kilowatt hour', 'kilowatt hours']
      }
    },
    examples: ['500 calories to joules', '2 kwh to joules']
  },
  currency: {
    label: 'Currency & Crypto',
    icon: '💱',
    description: 'Static snapshot rates for global currencies and BTC.',
    type: 'linear',
    base: 'usd',
    rank: ['usd', 'eur', 'gbp', 'cad', 'aud', 'inr', 'jpy', 'cny', 'btc'],
    units: (() => {
      const rates = {
        usd: { perUsd: 1, symbol: '$', currency: 'USD', label: 'US Dollar', synonyms: ['usd', 'us dollar', 'dollar', 'dollars', '$'] },
        eur: { perUsd: 0.92, symbol: '€', currency: 'EUR', label: 'Euro', synonyms: ['eur', 'euro', 'euros', '€'] },
        gbp: { perUsd: 0.79, symbol: '£', currency: 'GBP', label: 'British Pound', synonyms: ['gbp', 'pound', 'pounds', 'sterling', '£'] },
        cad: { perUsd: 1.34, symbol: 'CA$', currency: 'CAD', label: 'Canadian Dollar', synonyms: ['cad', 'canadian dollar', 'ca$', 'c$', 'cad$', 'cad dollar'] },
        aud: { perUsd: 1.51, symbol: 'A$', currency: 'AUD', label: 'Australian Dollar', synonyms: ['aud', 'australian dollar', 'a$', 'aud$'] },
        inr: { perUsd: 83.2, symbol: '₹', currency: 'INR', label: 'Indian Rupee', synonyms: ['inr', 'rupee', 'rupees', '₹'] },
        jpy: { perUsd: 147.3, symbol: '¥', currency: 'JPY', label: 'Japanese Yen', synonyms: ['jpy', 'yen', '¥'] },
        cny: { perUsd: 7.15, symbol: '¥', currency: 'CNY', label: 'Chinese Yuan', synonyms: ['cny', 'yuan', 'renminbi', 'rmb', '¥'] },
        btc: { perUsd: 0.000025, symbol: '₿', currency: 'BTC', label: 'Bitcoin', synonyms: ['btc', 'bitcoin', '₿'] }
      };
      return Object.fromEntries(
        Object.entries(rates).map(([key, value]) => [
          key,
          {
            label: value.label,
            symbol: value.symbol,
            multiplier: 1 / value.perUsd,
            synonyms: [key, ...value.synonyms],
            currency: value.currency
          }
        ])
      );
    })(),
    examples: ['500 usd to eur', '1200 eur to usd', '0.05 btc to usd']
  }
};

const ingredientProfiles = {
  flour: {
    label: 'All-purpose flour',
    gramsPerCup: 120,
    synonyms: ['flour', 'ap flour', 'all purpose flour']
  },
  sugar: {
    label: 'Granulated sugar',
    gramsPerCup: 200,
    synonyms: ['sugar', 'white sugar', 'granulated sugar']
  },
  'brown-sugar': {
    label: 'Brown sugar (packed)',
    gramsPerCup: 220,
    synonyms: ['brown sugar', 'light brown sugar', 'dark brown sugar']
  },
  butter: {
    label: 'Butter',
    gramsPerCup: 227,
    synonyms: ['butter']
  },
  honey: {
    label: 'Honey',
    gramsPerCup: 340,
    synonyms: ['honey']
  },
  oats: {
    label: 'Rolled oats',
    gramsPerCup: 90,
    synonyms: ['oats', 'rolled oats', 'oatmeal']
  },
  rice: {
    label: 'Uncooked white rice',
    gramsPerCup: 185,
    synonyms: ['rice', 'white rice', 'uncooked rice']
  }
};

const categoryCards = [
  {
    id: 'smart-search',
    icon: '🔎',
    title: 'Smart Search',
    description: 'Type naturally—Codex handles context, ingredients, and plural forms.',
    example: '5 miles to km'
  },
  {
    id: 'cooking',
    icon: '🧑‍🍳',
    title: 'Cooking Mode',
    description: 'Convert cups, ml, grams, and oven temperatures with ingredient-aware results.',
    example: '10 cups flour to grams'
  },
  {
    id: 'currency',
    icon: '💱',
    title: 'Finance Ready',
    description: 'Offline snapshot rates for currencies and crypto. Perfect for quick budgets.',
    example: '2500 usd to eur'
  },
  {
    id: 'tech',
    icon: '💻',
    title: 'Tech & Data',
    description: 'Storage, throughput, DPI, and more. Supports binary and decimal units.',
    example: '2048 mib to gb'
  },
  {
    id: 'energy',
    icon: '⚡',
    title: 'Energy & Power',
    description: 'Joules, calories, watt-hours. Translate workouts and appliances instantly.',
    example: '500 calories to joules'
  },
  {
    id: 'health',
    icon: '🫀',
    title: 'Health Tools',
    description: 'Steps to distance, calories to joules, plus BMI shortcuts.',
    example: 'bmi 70kg 1.75m'
  }
];

const { ingredientMap, ingredientSynonyms } = buildIngredientLookup();
const { unitLookup, unitSynonyms } = buildUnitLookup();

const chips = buildExampleQueries();
const state = {
  favorites: loadFromStorage(STORAGE_KEYS.favorites, []),
  history: loadFromStorage(STORAGE_KEYS.history, []),
  theme: loadFromStorage(STORAGE_KEYS.theme, null)
};

const elements = {
  query: document.getElementById('query'),
  clearQuery: document.getElementById('clearQuery'),
  results: document.getElementById('results'),
  chips: document.getElementById('exampleChips'),
  favorites: document.getElementById('favoriteList'),
  history: document.getElementById('historyList'),
  liveRegion: document.getElementById('liveRegion'),
  themeToggle: document.getElementById('themeToggle'),
  categoryGrid: document.getElementById('categoryGrid')
};

const numberFormatCache = new Map();
let debounceTimer = null;

init();

function init() {
  renderTheme(state.theme);
  renderChips();
  renderCategoryCards();
  renderFavorites();
  renderHistory();

  elements.query.addEventListener('input', handleQueryInput);
  elements.query.addEventListener('keydown', handleQueryKeydown);
  elements.clearQuery.addEventListener('click', clearQuery);
  elements.results.addEventListener('click', handleResultClick);
  elements.favorites.addEventListener('click', handleSavedQueryClick);
  elements.history.addEventListener('click', handleSavedQueryClick);
  elements.themeToggle.addEventListener('click', toggleTheme);

  if (state.history.length) {
    elements.query.placeholder = state.history[0].query;
  }

  if (elements.query.value.trim()) {
    performConversion(elements.query.value.trim());
  }
}

function renderCategoryCards() {
  const fragment = document.createDocumentFragment();
  categoryCards.forEach(card => {
    const article = document.createElement('article');
    article.className = 'category-card';
    article.innerHTML = `
      <span class="category-card__icon" aria-hidden="true">${card.icon}</span>
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <button class="chip" type="button" data-query="${card.example}">${card.example}</button>
    `;
    fragment.appendChild(article);
  });
  elements.categoryGrid.appendChild(fragment);
  elements.categoryGrid.addEventListener('click', handleSavedQueryClick);
}

function renderChips() {
  const fragment = document.createDocumentFragment();
  chips.forEach(query => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.dataset.query = query;
    button.textContent = query;
    fragment.appendChild(button);
  });
  elements.chips.appendChild(fragment);
  elements.chips.addEventListener('click', handleSavedQueryClick);
}

function handleSavedQueryClick(event) {
  const target = event.target.closest('[data-query]');
  if (!target) return;
  const query = target.dataset.query;
  if (query) {
    elements.query.value = query;
    elements.query.focus();
    updateClearButton();
    performConversion(query);
  }
}

function handleQueryInput(event) {
  const query = event.target.value;
  updateClearButton();
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    performConversion(query.trim());
  }, 200);
}

function handleQueryKeydown(event) {
  if (event.key === 'Enter') {
    const query = event.target.value.trim();
    if (query) {
      performConversion(query);
    }
  }
}

function updateClearButton() {
  const visible = elements.query.value.length > 0;
  elements.clearQuery.classList.toggle('is-visible', visible);
}

function clearQuery() {
  elements.query.value = '';
  updateClearButton();
  elements.results.innerHTML = '';
  announce('Input cleared.');
}

function performConversion(query) {
  if (!query) {
    elements.results.innerHTML = '';
    return;
  }

  const interpretation = interpretQuery(query);
  if (!interpretation) {
    renderMessage('Type a unit or conversion to get started.');
    return;
  }

  if (interpretation.type === 'error') {
    renderMessage(interpretation.message);
    return;
  }

  let result;
  if (interpretation.type === 'bmi') {
    result = convertBMI(interpretation);
  } else {
    result = convertUnits(interpretation);
  }

  if (!result) {
    renderMessage('No conversion available for that request yet.');
    return;
  }

  renderResultCard(result);
  if (result.summary) {
    saveHistoryEntry({
      query,
      summary: result.summary,
      category: result.categoryLabel,
      timestamp: Date.now()
    });
  }
}

function interpretQuery(raw) {
  const query = raw.trim();
  if (!query) return null;

  const normalized = query
    .replace(/–/g, '-')
    .replace(/×/g, '*')
    .replace(/degrees?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (/^bmi\b/i.test(normalized)) {
    return interpretBMI(normalized);
  }

  const tokens = normalized.split(/(?:\sto\s|\sin\s|→|->)/i);
  const left = tokens[0] ? tokens[0].trim() : '';
  const right = tokens[1] ? tokens[1].trim() : '';

  const { value, remainder } = extractValue(left);
  const fromMatch = findUnitMatch(remainder);

  if (!fromMatch) {
    return {
      type: 'error',
      message: 'Hmm, we could not spot the starting unit. Try “5 miles to km” or “10 cups flour to grams”.'
    };
  }

  let ingredient = extractIngredient(fromMatch.remainder);
  let toMatch = null;
  let targetIngredient = null;

  if (right) {
    toMatch = findUnitMatch(right);
    if (toMatch) {
      targetIngredient = extractIngredient(toMatch.remainder);
      if (!ingredient && targetIngredient) {
        ingredient = targetIngredient;
      }
    } else {
      // maybe it is just an ingredient request, like "200 grams to cups flour"
      const potentialIngredient = extractIngredient(right);
      if (potentialIngredient) {
        ingredient = potentialIngredient;
      }
    }
  }

  return {
    type: 'unit',
    raw: query,
    value,
    from: fromMatch,
    to: toMatch,
    ingredient,
    hasExplicitTarget: Boolean(right)
  };
}

function interpretBMI(normalized) {
  const numbers = normalized.match(/-?\d+(?:[\.,]\d+)?/g);
  if (!numbers || numbers.length < 2) {
    return { type: 'error', message: 'BMI needs weight and height. Example: “BMI 70kg 1.75m”.' };
  }
  const weight = parseNumber(numbers[0]);
  const heightValue = parseNumber(numbers[1]);
  let heightMeters = heightValue;
  if (/cm/.test(normalized)) {
    heightMeters = heightValue / 100;
  }
  return {
    type: 'bmi',
    weight,
    height: heightMeters
  };
}

function convertBMI({ weight, height }) {
  if (!height || !weight) {
    return null;
  }
  const bmi = weight / (height * height);
  const formatted = formatNumber(bmi, { maximumFractionDigits: 1 });
  const status = bmiCategory(bmi);
  return {
    category: 'health',
    categoryLabel: 'Health Tools',
    summary: `BMI ${formatted}`,
    headline: `BMI ${formatted}`,
    fromText: `${formatNumber(weight)} kg · ${formatNumber(height, { maximumFractionDigits: 2 })} m`,
    rows: [
      { label: 'Classification', value: status },
      { label: 'Healthy range', value: '18.5 – 24.9' }
    ],
    note: 'BMI uses metric inputs. Height defaults to meters unless “cm” is provided.'
  };
}

function bmiCategory(value) {
  if (value < 18.5) return 'Underweight';
  if (value < 25) return 'Healthy';
  if (value < 30) return 'Overweight';
  return 'Obese';
}

function convertUnits(request) {
  const { value, from, to, ingredient } = request;
  const fromCategory = unitCategories[from.category];

  if (!fromCategory) {
    return null;
  }

  if (ingredient) {
    const converted = convertIngredient(value, from, to, ingredient, request.hasExplicitTarget);
    if (converted) {
      return converted;
    }
  }

  if (!to) {
    return convertWithinCategory(value, from.category, from.unitKey, null, request.raw);
  }

  if (to.category !== from.category) {
    return {
      category: fromCategory.label,
      categoryLabel: fromCategory.label,
      summary: null,
      headline: null,
      rows: [],
      note: 'The destination unit lives in a different category. Try another pair or add an ingredient for cooking conversions.'
    };
  }

  return convertWithinCategory(value, from.category, from.unitKey, to.unitKey, request.raw);
}

function convertIngredient(value, from, to, ingredientKey, hasExplicitTarget) {
  const profile = ingredientMap.get(ingredientKey?.key);
  if (!profile) {
    return {
      category: 'Cooking',
      categoryLabel: 'Cooking',
      summary: null,
      headline: null,
      rows: [],
      note: 'Ingredient not recognized yet. Try flour, sugar, butter, honey, oats, or rice.'
    };
  }

  const volumeUnits = new Set(Object.keys(unitCategories.volume.units));
  const weightUnits = new Set(Object.keys(unitCategories.weight.units));

  const isVolumeStart = volumeUnits.has(from.unitKey);
  const isWeightStart = weightUnits.has(from.unitKey);

  if (!isVolumeStart && !isWeightStart) {
    return null;
  }

  let targetKey = to ? to.unitKey : null;
  let isVolumeTarget = targetKey ? volumeUnits.has(targetKey) : false;
  let isWeightTarget = targetKey ? weightUnits.has(targetKey) : false;

  if (!targetKey) {
    targetKey = isVolumeStart ? 'gram' : 'cup';
    isWeightTarget = isVolumeStart;
    isVolumeTarget = !isVolumeStart;
  }

  if (isVolumeStart && !isWeightTarget) {
    // volume -> volume fallback if user asked for ml etc.
    if (isVolumeTarget) {
      return convertWithinCategory(value, 'volume', from.unitKey, targetKey, null, {
        note: `Ingredient context ignored because both units are volume.`
      });
    }
    isWeightTarget = true;
  }

  if (isWeightStart && !isVolumeTarget && !isWeightTarget) {
    return convertWithinCategory(value, from.category, from.unitKey, targetKey, null, {
      note: 'Ingredient context applies to weight ↔ volume conversions.'
    });
  }

  const ingredientLabel = profile.label;
  const gramsPerCup = profile.gramsPerCup;
  let primaryValue;
  let primaryUnitKey = targetKey;
  let rows;
  let summary;
  let note = `${ingredientLabel}: approx. ${gramsPerCup} g per cup.`;
  let categoryLabel = 'Cooking';

  if (isVolumeStart) {
    const grams = convertBetween('volume', value, from.unitKey, 'cup') * gramsPerCup;
    primaryValue = convertBetween('weight', grams, 'gram', targetKey);
    rows = buildAlternativesFromWeight(grams, targetKey);
    summary = `${formatNumber(value)} ${unitCategories.volume.units[from.unitKey].symbol || unitCategories.volume.units[from.unitKey].label} → ${formatNumber(primaryValue)} ${unitCategories.weight.units[targetKey]?.symbol || unitCategories.weight.units[targetKey]?.label}`;
  } else {
    const grams = convertBetween('weight', value, from.unitKey, 'gram');
    const cups = grams / gramsPerCup;
    primaryValue = convertBetween('volume', cups, 'cup', targetKey);
    rows = buildAlternativesFromVolume(cups, targetKey);
    summary = `${formatNumber(value)} ${unitCategories.weight.units[from.unitKey].symbol || unitCategories.weight.units[from.unitKey].label} → ${formatNumber(primaryValue)} ${unitCategories.volume.units[targetKey]?.symbol || unitCategories.volume.units[targetKey]?.label}`;
  }

  const fromUnitLabel = isVolumeStart ? unitCategories.volume.units[from.unitKey].label : unitCategories.weight.units[from.unitKey].label;
  const toUnitLabel = isVolumeStart ? unitCategories.weight.units[primaryUnitKey]?.label : unitCategories.volume.units[primaryUnitKey]?.label;

  return {
    category: 'cooking',
    categoryLabel,
    summary,
    headline: `${formatNumber(primaryValue)} ${unitSymbol(primaryUnitKey)} ${toUnitLabel ? `(${toUnitLabel})` : ''}`.trim(),
    fromText: `${formatNumber(value)} ${unitSymbol(from.unitKey)} ${fromUnitLabel ? `(${fromUnitLabel})` : ''}`.trim(),
    rows,
    note
  };
}

function buildAlternativesFromWeight(grams, excludeKey) {
  const keys = unitCategories.weight.rank;
  const rows = [];
  keys.forEach(key => {
    if (key === excludeKey) return;
    const converted = convertBetween('weight', grams, 'gram', key);
    rows.push({
      label: unitCategories.weight.units[key].label,
      value: `${formatNumber(converted)} ${unitCategories.weight.units[key].symbol}`
    });
  });
  return rows.slice(0, 5);
}

function buildAlternativesFromVolume(cups, excludeKey) {
  const keys = unitCategories.volume.rank;
  const rows = [];
  keys.forEach(key => {
    if (key === excludeKey) return;
    const converted = convertBetween('volume', cups, 'cup', key);
    rows.push({
      label: unitCategories.volume.units[key].label,
      value: `${formatNumber(converted)} ${unitCategories.volume.units[key].symbol || unitCategories.volume.units[key].label}`
    });
  });
  return rows.slice(0, 5);
}

function convertWithinCategory(value, categoryKey, fromKey, toKey = null, rawQuery = null, options = {}) {
  const category = unitCategories[categoryKey];
  if (!category) return null;
  const fromUnit = category.units[fromKey];
  if (!fromUnit) return null;

  let targetKey = toKey;
  if (!targetKey) {
    targetKey = category.rank.find(key => key !== fromKey) || fromKey;
  }

  const toUnit = category.units[targetKey];
  if (!toUnit) return null;

  const convertedValue = convertBetween(categoryKey, value, fromKey, targetKey);
  const rows = buildAlternatives(categoryKey, value, fromKey, targetKey);
  const summary = `${formatNumber(value)} ${unitSymbol(fromKey)} → ${formatNumber(convertedValue)} ${unitSymbol(targetKey)}`;

  const note = options.note || (categoryKey === 'currency'
    ? 'Rates use an offline snapshot for 2025 planning—refresh manually for live markets.'
    : null);

  return {
    category: categoryKey,
    categoryLabel: category.label,
    summary,
    headline: `${formatNumber(convertedValue)} ${unitSymbol(targetKey)} (${category.units[targetKey].label})`,
    fromText: `${formatNumber(value)} ${unitSymbol(fromKey)} (${category.units[fromKey].label})`,
    rows,
    note
  };
}

function buildAlternatives(categoryKey, value, fromKey, primaryKey) {
  const category = unitCategories[categoryKey];
  const rows = [];
  category.rank.forEach(key => {
    if (key === primaryKey || key === fromKey) return;
    const unit = category.units[key];
    if (!unit) return;
    const converted = convertBetween(categoryKey, value, fromKey, key);
    rows.push({
      label: unit.label,
      value: `${formatNumber(converted)} ${unitSymbol(key)}`
    });
  });
  return rows.slice(0, 6);
}

function convertBetween(categoryKey, value, fromKey, toKey) {
  if (fromKey === toKey) return value;
  const category = unitCategories[categoryKey];
  const from = category.units[fromKey];
  const to = category.units[toKey];
  if (!from || !to) return value;

  if (category.type === 'linear') {
    const baseValue = value * from.multiplier;
    return baseValue / to.multiplier;
  }

  if (category.type === 'temperature') {
    const baseValue = from.toBase(value);
    return to.fromBase(baseValue);
  }

  return value;
}

function findUnitMatch(text) {
  if (!text) return null;
  const normalized = normalizeUnitText(text);
  for (const synonym of unitSynonyms) {
    if (normalized === synonym || normalized.startsWith(`${synonym} `)) {
      const data = unitLookup.get(synonym);
      if (data) {
        const remainder = normalized.slice(synonym.length).trim();
        return {
          ...data,
          remainder
        };
      }
    }
  }
  // fallback: try includes
  for (const synonym of unitSynonyms) {
    const index = normalized.indexOf(` ${synonym} `);
    if (index > -1) {
      const data = unitLookup.get(synonym);
      if (data) {
        const remainder = (normalized.slice(0, index) + ' ' + normalized.slice(index + synonym.length + 1)).trim();
        return {
          ...data,
          remainder
        };
      }
    }
  }
  return null;
}

function extractIngredient(text) {
  if (!text) return null;
  const cleaned = text
    .replace(/\bof\b/g, ' ')
    .replace(/\bthe\b/g, ' ')
    .replace(/[^a-z\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return null;
  for (const synonym of ingredientSynonyms) {
    if (cleaned === synonym || cleaned.startsWith(`${synonym} `) || cleaned.endsWith(` ${synonym}`) || cleaned.includes(` ${synonym} `)) {
      return ingredientMap.get(synonym);
    }
  }
  return null;
}

function extractValue(text) {
  const valueMatch = text.match(/-?\d+(?:[\.,]\d+)?(?:\s*\/\s*\d+)?/);
  let value = 1;
  let remainder = text;
  if (valueMatch) {
    value = parseNumber(valueMatch[0]);
    remainder = (text.slice(0, valueMatch.index) + text.slice(valueMatch.index + valueMatch[0].length)).trim();
  }
  return { value, remainder };
}

function parseNumber(str) {
  if (!str) return 0;
  const cleaned = str.replace(/,/g, '').trim();
  if (cleaned.includes('/')) {
    const [numerator, denominator] = cleaned.split('/').map(Number);
    if (denominator) {
      return numerator / denominator;
    }
  }
  return Number(cleaned);
}

function normalizeUnitText(text) {
  return text
    .toLowerCase()
    .replace(/\bper\b/g, '/')
    .replace(/[^a-z0-9°/\.\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function unitSymbol(unitKey) {
  for (const category of Object.values(unitCategories)) {
    if (category.units[unitKey]) {
      return category.units[unitKey].symbol || category.units[unitKey].label;
    }
  }
  return unitKey;
}

function formatNumber(value, options = {}) {
  if (!isFinite(value)) return '—';
  const abs = Math.abs(value);
  let maximumFractionDigits = 4;
  if (abs === 0 || abs >= 1000) maximumFractionDigits = 2;
  if (abs >= 100000) maximumFractionDigits = 0;
  if (abs < 1) maximumFractionDigits = 6;
  const key = `${maximumFractionDigits}-${options.maximumFractionDigits || ''}-${options.minimumFractionDigits || ''}`;
  let formatter = numberFormatCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: options.maximumFractionDigits ?? maximumFractionDigits,
      minimumFractionDigits: options.minimumFractionDigits ?? 0
    });
    numberFormatCache.set(key, formatter);
  }
  return formatter.format(value);
}

function renderResultCard(result) {
  if (!result.headline) {
    renderMessage(result.note || 'No conversion available.');
    return;
  }

  const isFavorite = state.favorites.some(item => item.summary === result.summary);
  const actions = `
    <div class="result-card__actions">
      <button class="icon-btn ${isFavorite ? 'is-active' : ''}" data-action="favorite" type="button">
        ${isFavorite ? '★ Saved' : '☆ Save'}
      </button>
      <button class="icon-btn" data-action="copy" type="button">Copy</button>
    </div>
  `;

  const rowsHtml = result.rows.map(row => `
    <div class="result-row">
      <span class="result-row__label">${row.label}</span>
      <span class="result-row__value">${row.value}</span>
    </div>
  `).join('');

  elements.results.innerHTML = `
    <article class="result-card" data-summary="${encodeURIComponent(result.summary)}" data-category="${result.category}" data-category-label="${result.categoryLabel}">
      <div class="result-card__header">
        <div class="result-card__title">
          <span class="result-card__summary">${result.headline}</span>
          <span class="result-card__sub">${result.fromText}</span>
        </div>
        ${actions}
      </div>
      <div class="result-card__list">
        ${rowsHtml}
      </div>
      ${result.note ? `<p class="result-note">${result.note}</p>` : ''}
    </article>
  `;
}

function renderMessage(message) {
  elements.results.innerHTML = `<p class="result-note">${message}</p>`;
}

function handleResultClick(event) {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  const card = event.target.closest('.result-card');
  if (!card) return;
  const summary = decodeURIComponent(card.dataset.summary || '');
  const headline = card.querySelector('.result-card__summary')?.textContent || summary;
  const fromText = card.querySelector('.result-card__sub')?.textContent || '';
  const categoryLabel = card.dataset.categoryLabel || card.dataset.category || '';

  if (action === 'favorite') {
    toggleFavorite({ summary, headline, fromText, categoryLabel });
    actionButton.classList.toggle('is-active');
    actionButton.textContent = actionButton.classList.contains('is-active') ? '★ Saved' : '☆ Save';
  }

  if (action === 'copy') {
    const clipboardText = `${headline} • ${fromText}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(clipboardText).then(() => announce('Copied to clipboard.'), () => announce('Copy failed.'));
    } else {
      announce('Clipboard not available.');
    }
  }
}

function toggleFavorite(entry) {
  const existingIndex = state.favorites.findIndex(item => item.summary === entry.summary);
  if (existingIndex > -1) {
    state.favorites.splice(existingIndex, 1);
    announce('Removed from favorites.');
  } else {
    state.favorites.unshift({ ...entry, query: elements.query.value.trim(), timestamp: Date.now() });
    announce('Saved to favorites.');
  }
  state.favorites = state.favorites.slice(0, 20);
  saveToStorage(STORAGE_KEYS.favorites, state.favorites);
  renderFavorites();
}

function saveHistoryEntry(entry) {
  const existingIndex = state.history.findIndex(item => item.query.toLowerCase() === entry.query.toLowerCase());
  if (existingIndex > -1) {
    state.history.splice(existingIndex, 1);
  }
  state.history.unshift(entry);
  state.history = state.history.slice(0, 15);
  saveToStorage(STORAGE_KEYS.history, state.history);
  renderHistory();
}

function renderFavorites() {
  renderList(elements.favorites, state.favorites);
}

function renderHistory() {
  renderList(elements.history, state.history);
}

function renderList(container, items) {
  container.innerHTML = '';
  if (!items.length) {
    container.textContent = '';
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'list-item';
    button.dataset.query = item.query || item.summary;
    button.innerHTML = `
      <span class="list-item__label">${item.summary || item.headline}</span>
      <span class="list-item__meta">${item.category || item.categoryLabel || ''}${item.timestamp ? ` • ${formatRelativeTime(item.timestamp)}` : ''}</span>
    `;
    fragment.appendChild(button);
  });
  container.appendChild(fragment);
}

function formatRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  if (diff < minute) return 'Just now';
  if (diff < hour) return `${Math.round(diff / minute)} min ago`;
  if (diff < day) return `${Math.round(diff / hour)} hr ago`;
  const days = Math.round(diff / day);
  return days === 1 ? 'Yesterday' : `${days} days ago`;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  state.theme = next;
  saveToStorage(STORAGE_KEYS.theme, next);
  renderTheme(next);
}

function renderTheme(theme) {
  let finalTheme = theme;
  if (!theme) {
    finalTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (finalTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    elements.themeToggle.textContent = '☀️ Light';
  } else {
    document.documentElement.removeAttribute('data-theme');
    elements.themeToggle.textContent = '🌙 Dark';
  }
}

function announce(message) {
  if (!elements.liveRegion) return;
  elements.liveRegion.textContent = '';
  setTimeout(() => {
    elements.liveRegion.textContent = message;
  }, 50);
}

function buildExampleQueries() {
  const examples = new Set();
  Object.values(unitCategories).forEach(category => {
    category.examples.forEach(example => examples.add(example));
  });
  categoryCards.forEach(card => examples.add(card.example));
  return Array.from(examples).slice(0, 12);
}

function buildUnitLookup() {
  const lookup = new Map();
  const synonyms = new Set();
  Object.entries(unitCategories).forEach(([categoryKey, category]) => {
    Object.entries(category.units).forEach(([unitKey, unit]) => {
      const words = new Set([unitKey, unit.symbol, ...(unit.synonyms || [])].filter(Boolean));
      words.forEach(word => {
        const normalized = normalizeUnitText(String(word));
        if (!normalized) return;
        if (!lookup.has(normalized)) {
          lookup.set(normalized, {
            category: categoryKey,
            unitKey,
            unit
          });
        }
        synonyms.add(normalized);
      });
    });
  });
  const list = Array.from(synonyms).sort((a, b) => b.length - a.length);
  return { unitLookup: lookup, unitSynonyms: list };
}

function buildIngredientLookup() {
  const map = new Map();
  const synonyms = new Set();
  Object.entries(ingredientProfiles).forEach(([key, profile]) => {
    const names = new Set([key, ...(profile.synonyms || [])]);
    names.forEach(name => {
      const normalized = name
        .toLowerCase()
        .replace(/[^a-z\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (normalized) {
        map.set(normalized, { key, label: profile.label, gramsPerCup: profile.gramsPerCup });
        synonyms.add(normalized);
      }
    });
  });
  const ordered = Array.from(synonyms).sort((a, b) => b.length - a.length);
  return { ingredientMap: map, ingredientSynonyms: ordered };
}

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored);
  } catch (error) {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Storage unavailable', error);
  }
}
