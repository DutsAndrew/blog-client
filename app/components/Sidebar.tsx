'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { SidebarState } from '@/types/interfaces';
import parse from 'html-react-parser';

const Sidebar = () => {

  const [apiResponse, setApiResponse] = useState<SidebarState>({
    message: '',
    // optional announcements state
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const url = 'http://localhost:8080/api/announcements';
    const retrieveAnnouncements = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const response = await retrieveAnnouncements.json();
    if (response.announcements) {
      // announcements found
      setApiResponse({
        message: response.message,
        announcements: response.announcements,
      });
    } else {
      // no announcements
      setApiResponse({
        message: response.message,
      });
    };
  };

  if (!apiResponse.announcements) {
    return (
      <section className={styles.sidebarContainer}>
        <h2 className={styles.sideBarHeaderText}>
          Announcements
        </h2>
      </section>
    );
  } else {
    return (
      <section className={styles.sidebarContainer}>
        <h2 className={styles.sideBarHeaderText}>
          Announcements
        </h2>
        <div className={styles.announcementsContainer}>
          {apiResponse.announcements.map((announcement) => {
            return <div className={styles.announcementText}>
              {parse(announcement.announcement)}
            </div>
          })}
        </div>
      </section>
    );
  }
};

export default Sidebar;