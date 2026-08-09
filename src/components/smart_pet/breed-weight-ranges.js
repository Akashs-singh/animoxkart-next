// Healthy adult weight ranges (kg) per breed.
// Values cover male/female overlap — we use the full span as the "healthy band".
// Source: AKC / VCA breed standards.
const BREED_WEIGHT_RANGES = {
  // Large / Giant
  'Alaskan Malamute':       { min: 34, max: 43 },
  'Bernese Mountain Dog':   { min: 32, max: 52 },
  'Boxer':                  { min: 25, max: 32 },
  'Doberman Pinscher':      { min: 32, max: 45 },
  'Great Dane':             { min: 45, max: 90 },
  'Mastiff':                { min: 54, max: 100 },
  'Rottweiler':             { min: 36, max: 61 },
  'Saint Bernard':          { min: 54, max: 82 },
  'Siberian Husky':         { min: 16, max: 27 },
  'Newfoundland':           { min: 45, max: 68 },
  'Dogo Argentino':         { min: 36, max: 45 },
  'Rhodesian Ridgeback':    { min: 29, max: 41 },
  // Medium-large
  'Labrador Retriever':     { min: 25, max: 36 },
  'Golden Retriever':       { min: 25, max: 34 },
  'Weimaraner':             { min: 23, max: 36 },
  'Brittany Spaniel':       { min: 14, max: 20 },
  'Irish Setter':           { min: 25, max: 32 },
  'Australian Shepherd':    { min: 16, max: 32 },
  'Border Collie':          { min: 14, max: 20 },
  'Collie':                 { min: 18, max: 34 },
  'German Shepherd':        { min: 22, max: 40 },
  'Shetland Sheepdog':      { min: 6,  max: 11 },
  'Old English Sheepdog':   { min: 27, max: 45 },
  'Dalmatian':              { min: 20, max: 32 },
  'Poodle':                 { min: 18, max: 32 },
  'Portuguese Water Dog':   { min: 16, max: 25 },
  'Australian Cattle Dog':  { min: 14, max: 20 },
  'Basenji':                { min: 9,  max: 12 },
  'Belgian Laekenois':      { min: 20, max: 30 },
  'American Bully':         { min: 25, max: 45 },
  // Medium
  'Cocker Spaniel':         { min: 9,  max: 14 },
  'English Springer Spaniel':{ min: 18, max: 25 },
  'Beagle':                 { min: 9,  max: 14 },
  'Basset Hound':           { min: 20, max: 29 },
  'Bloodhound':             { min: 36, max: 50 },
  'Greyhound':              { min: 27, max: 40 },
  'Whippet':                { min: 7,  max: 14 },
  'Bulldog':                { min: 18, max: 25 },
  'French Bulldog':         { min: 8,  max: 13 },
  'Shiba Inu':              { min: 7,  max: 11 },
  'Boston Terrier':         { min: 5,  max: 11 },
  'Bull Terrier':           { min: 20, max: 36 },
  'Jack Russell Terrier':   { min: 5,  max: 8  },
  'Schnauzer':              { min: 14, max: 20 },
  'Airedale Terrier':       { min: 18, max: 29 },
  // Small
  'Pembroke Welsh Corgi':   { min: 10, max: 14 },
  'Bichon Frisé':           { min: 5,  max: 10 },
  'Scottish Terrier':       { min: 8,  max: 10 },
  'West Highland White Terrier (Westie)': { min: 6, max: 10 },
  'Cairn Terrier':          { min: 6,  max: 8  },
  'Chihuahua':              { min: 1,  max: 3  },
  'Pomeranian':             { min: 1,  max: 3  },
  'Shih Tzu':               { min: 4,  max: 8  },
  'Pekingese':              { min: 3,  max: 6  },
  'Yorkshire Terrier':      { min: 2,  max: 3  },
  'Maltese':                { min: 1,  max: 4  },
  'Papillon':               { min: 2,  max: 5  },
  'Toy Poodle':             { min: 2,  max: 4  },
  'Chinese Crested':        { min: 2,  max: 6  },
  // Cats
  'Persian':                { min: 3,  max: 6  },
  'Maine Coon':             { min: 4,  max: 9  },
  'Siamese':                { min: 3,  max: 5  },
  'Bengal':                 { min: 4,  max: 7  },
  'Sphynx':                 { min: 3,  max: 5  },
  'Ragdoll':                { min: 4,  max: 9  },
  'Abyssinian':             { min: 3,  max: 5  },
  'British Shorthair':      { min: 4,  max: 8  },
  'Scottish Fold':          { min: 3,  max: 6  },
  'Russian Blue':           { min: 3,  max: 6  },
  'Exotic Shorthair':       { min: 3,  max: 6  },
  'Burmese':                { min: 3,  max: 6  },
  'Birman':                 { min: 3,  max: 6  },
  'Oriental Shorthair':     { min: 3,  max: 6  },
  'Manx':                   { min: 3,  max: 6  },
};

/**
 * Returns { min, max } healthy weight range for the given breed,
 * or null when the breed is unknown / "Other".
 */
export function getBreedRange(breed) {
  if (!breed || breed === 'Other') return null;
  return BREED_WEIGHT_RANGES[breed] || null;
}

/**
 * Returns 'underweight' | 'overweight' | 'healthy' | null
 */
export function classifyWeight(weightKg, breed) {
  const range = getBreedRange(breed);
  if (!range) return null;
  if (weightKg < range.min) return 'underweight';
  if (weightKg > range.max) return 'overweight';
  return 'healthy';
}
