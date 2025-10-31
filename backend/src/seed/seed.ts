import { Experience } from "../models/experience";

export const seedData = async (): Promise<{ success: boolean; message: string; count?: number; error?: string }> => {
  try {
    await Experience.deleteMany({});

    const sampleExperiences = [
      {
        title: 'Kayaking',
        location: 'Udupi',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
        price: 999, 
        image: 'https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2831',
        category: 'Water Sports',
        minAge: 18,
        about: 'Scenic routes, trained guides, and safety briefing. Helmet and Life jackets along with an expert will accompany in kayaking. Minimum age 18.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '07:00 am', available: 10, booked: 4 },
              { time: '9:00 am', available: 10, booked: 2 },
              { time: '11:00 am', available: 10, booked: 3 },
              { time: '1:00 pm', available: 10, booked: 10 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '07:00 am', available: 10, booked: 0 },
              { time: '9:00 am', available: 10, booked: 0 },
              { time: '11:00 am', available: 10, booked: 0 },
              { time: '1:00 pm', available: 10, booked: 0 }
            ]
          },
          {
            date: 'Oct 24',
            times: [
              { time: '07:00 am', available: 10, booked: 0 },
              { time: '9:00 am', available: 10, booked: 0 },
              { time: '11:00 am', available: 10, booked: 0 },
              { time: '1:00 pm', available: 10, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Nandi Hills Sunrise',
        location: 'Bangalore',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Experience the mesmerizing sunrise from the historic Nandi Hills.',
        price: 899,
        image: 'https://images.unsplash.com/photo-1614773017149-331e5bfe311c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2833',
        category: 'Trekking',
        minAge: 12,
        about: 'Transportation from Bangalore, breakfast, guided tour, and photography assistance. Witness breathtaking sunrise views from 1,478 meters above sea level.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '04:00 am', available: 15, booked: 5 },
              { time: '04:30 am', available: 15, booked: 8 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '04:00 am', available: 15, booked: 0 },
              { time: '04:30 am', available: 15, booked: 0 }
            ]
          },
          {
            date: 'Oct 24',
            times: [
              { time: '04:00 am', available: 15, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Coffee Trail',
        location: 'Coorg',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Walk through aromatic coffee plantations and learn about coffee processing.',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
        category: 'Nature',
        minAge: 10,
        about: 'Plantation tour, coffee tasting session, traditional Coorgi lunch, and local guide. Learn about coffee cultivation from bean to cup.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '08:00 am', available: 12, booked: 2 },
              { time: '10:00 am', available: 12, booked: 0 },
              { time: '02:00 pm', available: 12, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '08:00 am', available: 12, booked: 0 },
              { time: '10:00 am', available: 12, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Boat Cruise',
        location: 'Gundlupet',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Enjoy a serene boat ride through the scenic backwaters.',
        price: 999,
        image: 'https://images.unsplash.com/photo-1638123657021-f9aca72f8caf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
        category: 'Water Sports',
        minAge: 8,
        about: 'Life jackets, refreshments, bird watching guide, and sunset views. Family-friendly activity suitable for all ages above 8.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '09:00 am', available: 20, booked: 5 },
              { time: '12:00 pm', available: 20, booked: 0 },
              { time: '03:00 pm', available: 20, booked: 0 },
              { time: '05:00 pm', available: 20, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '09:00 am', available: 20, booked: 0 },
              { time: '12:00 pm', available: 20, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Bunjee Jumping',
        location: 'Manali',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Take the leap of faith from 160 feet high platform.',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1549221360-456a9c197d5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2074',
        category: 'Adventure',
        minAge: 18,
        about: 'All safety equipment, professional instructor, medical checkup, and certificate. Experience the ultimate adrenaline rush in the Himalayas.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '10:00 am', available: 8, booked: 2 },
              { time: '01:00 pm', available: 8, booked: 0 },
              { time: '03:00 pm', available: 8, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '10:00 am', available: 8, booked: 0 },
              { time: '01:00 pm', available: 8, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'River Rafting',
        location: 'Rishikesh',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Navigate through the thrilling rapids of holy Ganges.',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1627241129356-137242cf14f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2434',
        category: 'Water Sports',
        minAge: 14,
        about: 'Safety equipment, life jackets, helmets, experienced river guide, and riverside lunch. Grade 2-3 rapids suitable for beginners and intermediates.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '07:00 am', available: 12, booked: 0 },
              { time: '09:00 am', available: 12, booked: 3 },
              { time: '11:00 am', available: 12, booked: 0 },
              { time: '02:00 pm', available: 12, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '07:00 am', available: 12, booked: 0 },
              { time: '09:00 am', available: 12, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Paragliding',
        location: 'Bir Billing',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Soar like a bird over the beautiful Kangra valley.',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1521897258701-21e2a01f5e8b?w=800&auto=format&fit=crop&q=80',
        category: 'Adventure',
        minAge: 16,
        about: 'Certified pilot, all safety gear, GoPro video recording, and transport to launch site. Experience the best paragliding destination in Asia.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '09:00 am', available: 10, booked: 4 },
              { time: '11:00 am', available: 10, booked: 0 },
              { time: '01:00 pm', available: 10, booked: 0 },
              { time: '03:00 pm', available: 10, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '09:00 am', available: 10, booked: 0 },
              { time: '11:00 am', available: 10, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Scuba Diving',
        location: 'Andaman Islands',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Discover the vibrant underwater world of coral reefs.',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=80',
        category: 'Water Sports',
        minAge: 12,
        about: 'Complete diving equipment, PADI certified instructor, underwater photography, and refreshments. Explore pristine coral reefs and marine life.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '08:00 am', available: 8, booked: 2 },
              { time: '10:00 am', available: 8, booked: 0 },
              { time: '01:00 pm', available: 8, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '08:00 am', available: 8, booked: 0 },
              { time: '10:00 am', available: 8, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Trekking to Valley of Flowers',
        location: 'Uttarakhand',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Trek through UNESCO World Heritage Site blooming with alpine flowers.',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80',
        category: 'Trekking',
        minAge: 15,
        about: 'Trekking guide, camping equipment, meals, permits, and first aid. 3-day trek covering 40 km through stunning Himalayan landscapes.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '06:00 am', available: 15, booked: 0 }
            ]
          },
          {
            date: 'Oct 24',
            times: [
              { time: '06:00 am', available: 15, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Wildlife Safari',
        location: 'Jim Corbett National Park',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Spot Bengal tigers and diverse wildlife in their natural habitat.',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 10,
        about: 'Safari jeep, naturalist guide, park entry fees, and binoculars. Early morning and evening safaris for best wildlife sighting opportunities.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '06:00 am', available: 6, booked: 2 },
              { time: '03:00 pm', available: 6, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '06:00 am', available: 6, booked: 0 },
              { time: '03:00 pm', available: 6, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Hot Air Balloon Ride',
        location: 'Jaipur',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Float over the Pink City and witness majestic forts from above.',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1497531551184-06b252e1bee1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
        category: 'Adventure',
        minAge: 8,
        about: 'Balloon ride, pilot, champagne toast, flight certificate, and hotel transfers. 1-hour flight over Amber Fort and Jaipur landscapes.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '05:30 am', available: 8, booked: 5 },
              { time: '06:00 am', available: 8, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '05:30 am', available: 8, booked: 0 },
              { time: '06:00 am', available: 8, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Camping in Spiti Valley',
        location: 'Himachal Pradesh',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Camp under starlit skies in the cold desert of Spiti.',
        price: 3999,
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 16,
        about: 'Camping equipment, meals, bonfire, local guide, and permits. 2-night camping experience in the breathtaking Spiti Valley.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '02:00 pm', available: 10, booked: 0 }
            ]
          },
          {
            date: 'Oct 24',
            times: [
              { time: '02:00 pm', available: 10, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Rock Climbing',
        location: 'Hampi',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Scale ancient boulder formations in UNESCO World Heritage Site.',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop&q=80',
        category: 'Adventure',
        minAge: 14,
        about: 'Climbing equipment, harness, helmet, certified instructor, and safety briefing. Multiple routes for beginners to advanced climbers.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '07:00 am', available: 8, booked: 0 },
              { time: '09:00 am', available: 8, booked: 1 },
              { time: '03:00 pm', available: 8, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '07:00 am', available: 8, booked: 0 },
              { time: '09:00 am', available: 8, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Backwater Cruise',
        location: 'Alleppey',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Cruise through serene Kerala backwaters on traditional houseboat.',
        price: 4499,
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
        category: 'Water Sports',
        minAge: 5,
        about: 'Traditional houseboat, meals (Kerala cuisine), guide, and sunset views. Full-day cruise through coconut groves and paddy fields.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '09:00 am', available: 12, booked: 3 },
              { time: '02:00 pm', available: 12, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '09:00 am', available: 12, booked: 0 },
              { time: '02:00 pm', available: 12, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Desert Safari',
        location: 'Jaisalmer',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Experience the golden sands of Thar Desert on camelback.',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 10,
        about: 'Camel ride, desert camping, Rajasthani dinner, cultural performance, and bonfire. Witness stunning desert sunset and star-gazing.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '03:00 pm', available: 15, booked: 6 },
              { time: '04:00 pm', available: 15, booked: 0 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '03:00 pm', available: 15, booked: 0 },
              { time: '04:00 pm', available: 15, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Cycling Tour',
        location: 'Goa',
        description: 'Curated small-group experience. Certified guide. Safety first with gear included. Explore hidden beaches and villages on guided cycling tour.',
        price: 899,
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 12,
        about: 'Bicycle, helmet, guide, refreshments, and beach stops. Ride through scenic coastal routes and spice plantations.',
        slots: [
          {
            date: 'Oct 22',
            times: [
              { time: '06:30 am', available: 12, booked: 0 },
              { time: '04:00 pm', available: 12, booked: 2 }
            ]
          },
          {
            date: 'Oct 23',
            times: [
              { time: '06:30 am', available: 12, booked: 0 },
              { time: '04:00 pm', available: 12, booked: 0 }
            ]
          }
        ]
      }
    ];

    await Experience.insertMany(sampleExperiences);
    return { success: true, message: 'Database seeded successfully', count: sampleExperiences.length };
  } catch (error: any) {
    return { success: false, message: 'Error seeding database', error: error.message };
  }
}
