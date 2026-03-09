export type PetCategory = 'All' | 'Dogs' | 'Cats' | 'Rabbits';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  distance: string;
  price: string;
  image: string;
  gallery?: string[];
  category: PetCategory;
  description: string;
  traits: string[];
  location: string;
  healthRecords: {
    vaccination: string;
    neutered: boolean;
    microchipped: boolean;
  };
}

export type Screen = 'onboarding' | 'home' | 'details' | 'application' | 'profile' | 'explore' | 'messages' | 'myApplications';

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  unread: boolean;
  type: 'system' | 'user';
}
