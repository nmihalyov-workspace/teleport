import React, { useEffect } from 'react';

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Профиль"
  }, []);

	return (<>
    abc
		{/* <StartNav title="01. Главная страница" />
		<StartNav title="07. Профиль агента до подписания договора" link="agent" /> */}
  </>);
};

export default ProfilePage;