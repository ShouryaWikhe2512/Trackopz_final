"use client";
import React, { useEffect, useState } from "react";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const [user, setUser] = useState<{
    username: string | null;
    profileImage: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUser({ username: data.username, profileImage: data.profileImage });
        } else {
          setUser({ username: null, profileImage: null });
        }
        setLoading(false);
      })
      .catch(() => {
        setUser({ username: null, profileImage: null });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HomeClient
      username={user?.username ?? null}
      profileImage={user?.profileImage ?? null}
    />
  );
}
