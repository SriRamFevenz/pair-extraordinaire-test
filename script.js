document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button, .achievement-card, .stat-box, .info-card');

  buttons.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translate(-2px, -2px)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });

  const githubUser = 'heyshreee';
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileHandle = document.getElementById('profileHandle');
  const profileBio = document.getElementById('profileBio');
  const repoCount = document.getElementById('repoCount');
  const followerCount = document.getElementById('followerCount');
  const followingCount = document.getElementById('followingCount');
  const starCount = document.getElementById('starCount');
  const primaryButton = document.querySelector('.button-primary');

  const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value || 0));

  const setText = (element, value) => {
    if (element) {
      element.textContent = value;
    }
  };

  const loadGitHubData = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${githubUser}`, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      });

      if (!userResponse.ok) {
        throw new Error('Unable to fetch GitHub profile');
      }

      const user = await userResponse.json();

      if (profileAvatar) {
        profileAvatar.src = user.avatar_url || '';
        profileAvatar.alt = `${user.login || githubUser} profile avatar`;
      }

      setText(profileName, user.name || user.login || githubUser);
      setText(profileHandle, `@${user.login || githubUser}`);
      setText(profileBio, user.bio || 'Building, learning, and shipping practical ideas.');

      if (primaryButton) {
        primaryButton.href = user.html_url || `https://github.com/${githubUser}`;
      }

      const reposResponse = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      });

      let totalStars = 0;

      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        totalStars = (repos || []).reduce((sum, repo) => sum + Number(repo.stargazers_count || 0), 0);
      }

      setText(repoCount, formatNumber(user.public_repos || 0));
      setText(followerCount, formatNumber(user.followers || 0));
      setText(followingCount, formatNumber(user.following || 0));
      setText(starCount, formatNumber(totalStars));
    } catch (error) {
      setText(profileBio, 'GitHub profile data is temporarily unavailable.');
      setText(repoCount, '0');
      setText(followerCount, '0');
      setText(followingCount, '0');
      setText(starCount, '0');
      console.error('GitHub profile fetch failed:', error);
    }
  };

  loadGitHubData();
});
