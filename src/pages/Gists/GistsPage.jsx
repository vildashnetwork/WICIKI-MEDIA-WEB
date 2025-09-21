// // pages/GistsPage.js
// import React, { useState } from 'react';

// const GistsPage = () => {
//   const [gists, setGists] = useState([
//     {
//       id: 1,
//       avatar: 'AM',
//       name: 'Amara Okafor',
//       skills: ['UI/UX Design', 'Figma'],
//       media: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1753389380/eydd5ndp7iqod1g5npzu.jpg',
//       content: 'Just completed a mobile banking app redesign focusing on accessibility and Afrocentric design patterns. The user feedback has been incredible!',
//       tapCount: 24
//     },
//     {
//       id: 2,
//       avatar: 'KN',
//       name: 'Kwame Nkrumah',
//       skills: ['Software Engineering', 'Python'],
//       media: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1753428445/v8nhjufe3ydfv8hapkbl.jpg',
//       content: 'Built an AI-powered agricultural prediction system for small-scale farmers. Open sourcing the code to help communities across Africa!',
//       tapCount: 67
//     },
//     {
//       id: 3,
//       avatar: 'ZM',
//       name: 'Zara Mwangi',
//       skills: ['Digital Marketing', 'Content Strategy'],
//       media: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1756974124/w3tey25aflrc2cl7cpip.jpg',
//       content: 'Launched a campaign that increased engagement for African startups by 300%. Sharing my framework for culturally-aware marketing strategies.',
//       tapCount: 89
//     }
//   ]);

//   const tapGist = (id) => {
//     setGists(gists.map(gist => 
//       gist.id === id ? { ...gist, tapCount: gist.tapCount + 1 } : gist
//     ));
//   };

//   return (
//     <div id="gists" className="page active">
//       <h2 style={{
//         marginBottom: '32px', 
//         fontSize: '28px', 
//         coloe: "var( --text-secondary)",
//         background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-orange))',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent'
//       }}>
//         Latest Gists
//       </h2>
//       <div className="gists-grid">
//         {gists.map(gist => (
//           <div key={gist.id} className="gist-card">
//          <div className="gist-header">
//   <div className="gist-avatar">{gist.avatar}</div>
//   <div className="gist-info">
//     <h4>{gist.name}</h4>
//     <div className="skill-tags">
//       {gist.skills.map((skill, index) => (
//         <span key={index} className="skill-tag">{skill}</span>
//       ))}
//     </div>
//   </div>
//   <div className='gistpage-menu'>
//     <ion-icon name="grid-outline"></ion-icon>
//   </div>
// </div>

//             <div className="gist-media" style={{backgroundImage: `url(${gist.media})`}}></div>
//             <p style={{ margin: '16px 0', color: 'var(--text-secondary)' }}>{gist.content}</p>
//             <div className="gist-actions">
//               <button className="action-btn" onClick={() => tapGist(gist.id)}>
//                 <span><ion-icon name="thumbs-up-outline"></ion-icon></span>
//                 <span className="tap-count">{gist.tapCount}</span>
//               </button>
//               <button className="action-btn">
//                 <span><ion-icon name="chatbubbles-outline"></ion-icon></span>
//                 <span>Gist</span>
//               </button>
//               <button className="action-btn">
//                 <span><ion-icon name="share-social-outline"></ion-icon></span>
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GistsPage;





import React, { useEffect, useState } from "react";
import "./Gists.css"
import Stories from "./Stories/Stories";
import PostCreation from "./PostCreation/PostCreation"
import FeedPost from "./FeedPost/FeedPost"
import Feed from "./Feed/Feed"
import FriendRequests from "./FriendRequests/FriendRequests"
import SuggestedMentors from "./SuggestedMentors/SuggestedMentors";
import Sidebar from "./Sidebar/Sidebar"
import StatusModal from "./StatusModal/StatusModal";
import AddStatusModal from "./AddStatusModal/AddStatusModal";
    const GistsPage = () => {



             // LocalStorage utilities
        const storage = {
            get: (key) => {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : null;
                } catch (error) {
                    console.error('Error reading from localStorage:', error);
                    return null;
                }
            },
            set: (key, value) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (error) {
                    console.error('Error writing to localStorage:', error);
                }
            }
        };

        // Sample media URLs
        const sampleImages = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
        ];

        const sampleVideos = [
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        ];

            const [posts, setPosts] = useState(() => storage.get('posts') || []);
            const [stories, setStories] = useState(() => storage.get('stories') || []);
            const [showStatusModal, setShowStatusModal] = useState(false);
            const [showAddStatusModal, setShowAddStatusModal] = useState(false);
            const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

            // Save to localStorage whenever data changes
            useEffect(() => {
                storage.set('posts', posts);
            }, [posts]);

            useEffect(() => {
                storage.set('stories', stories);
            }, [stories]);

            useEffect(() => {
                // Initialize sample data if empty
                if (posts.length === 0) {
                    const samplePosts = [
                        {
                            id: 1,
                            name: 'Sarah Johnson',
                            avatar: '👩‍💼',
                            content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️✨',
                            timestamp: Date.now() - 2 * 60 * 60 * 1000,
                            type: 'image',
                            mediaUrl: sampleImages[0],
                            liked: false,
                            likes: 12,
                            comments: []
                        },
                        {
                            id: 2,
                            name: 'Mike Chen',
                            avatar: '👨‍💻',
                            content: 'Excited to share that I just launched my new project! It\'s been months of hard work, but seeing it come to life is incredibly rewarding. 🚀',
                            timestamp: Date.now() - 4 * 60 * 60 * 1000,
                            type: 'video',
                            mediaUrl: sampleVideos[0],
                            liked: false,
                            likes: 8,
                            comments: []
                        },
                        {
                            id: 3,
                            name: 'Emma Davis',
                            avatar: '👩‍🎨',
                            content: 'Coffee and coding session this morning ☕️ Working on some exciting new features.',
                            timestamp: Date.now() - 6 * 60 * 60 * 1000,
                            type: 'text',
                            mediaUrl: null,
                            liked: false,
                            likes: 5,
                            comments: []
                        }
                    ];
                    setPosts(samplePosts);
                }

                if (stories.length === 0) {
                    const sampleStories = [
                        {
                            id: 1,
                            name: 'Sarah Johnson',
                            avatar: '👩‍💼',
                            type: 'image',
                            content: 'Amazing sunset! 🌅',
                            mediaUrl: sampleImages[1],
                            backgroundColor: '#e53935',
                            timestamp: Date.now() - 2 * 60 * 60 * 1000
                        },
                        {
                            id: 2,
                            name: 'Mike Chen',
                            avatar: '👨‍💻',
                            type: 'video',
                            content: 'Just launched my project! 🚀',
                            mediaUrl: sampleVideos[1],
                            backgroundColor: '#1976d2',
                            timestamp: Date.now() - 4 * 60 * 60 * 1000
                        },
                        {
                            id: 3,
                            name: 'Emma Davis',
                            avatar: '👩‍🎨',
                            type: 'text',
                            content: 'Coffee and creativity ☕️',
                            mediaUrl: null,
                            backgroundColor: '#43a047',
                            timestamp: Date.now() - 6 * 60 * 60 * 1000
                        }
                    ];
                    setStories(sampleStories);
                }
            }, []);

            const handleCreatePost = (postData) => {
                const newPost = {
                    id: Date.now(),
                    name: 'You',
                    avatar: '😊',
                    content: postData.content,
                    type: postData.type,
                    mediaUrl: postData.mediaUrl,
                    timestamp: Date.now(),
                    liked: false,
                    likes: 0,
                    comments: []
                };
                setPosts([newPost, ...posts]);
            };

            const handleAddStatus = (statusData) => {
                const newStatus = {
                    id: Date.now(),
                    name: 'You',
                    avatar: '😊',
                    ...statusData,
                    timestamp: Date.now()
                };
                setStories([newStatus, ...stories]);
            };

            const handleViewStatus = (index) => {
                setCurrentStatusIndex(index);
                setShowStatusModal(true);
            };

            const handleNextStatus = () => {
                setCurrentStatusIndex((prev) => (prev + 1) % stories.length);
            };

            const handlePrevStatus = () => {
                setCurrentStatusIndex((prev) => (prev - 1 + stories.length) % stories.length);
            };

            const handleLike = (postId) => {
                setPosts(posts.map(post => {
                    if (post.id === postId) {
                        const newLiked = !post.liked;
                        return {
                            ...post,
                            liked: newLiked,
                            likes: newLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1)
                        };
                    }
                    return post;
                }));
            };

            const handleComment = (postId, commentText) => {
                setPosts(posts.map(post => {
                    if (post.id === postId) {
                        const newComment = {
                            text: commentText,
                            timestamp: Date.now()
                        };
                        return {
                            ...post,
                            comments: [...(post.comments || []), newComment]
                        };
                    }
                    return post;
                }));
            };

            const handleLoadMore = () => {
                const additionalPosts = [
                    {
                        id: Date.now() + 1,
                        name: 'Alex Wilson',
                        avatar: '👨‍🎵',
                        content: 'Just wrapped up an amazing team meeting! Excited about the new project we\'re starting next week. 🚀',
                        timestamp: Date.now() - 8 * 60 * 60 * 1000,
                        type: 'image',
                        mediaUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
                        liked: false,
                        likes: 3,
                        comments: []
                    },
                    {
                        id: Date.now() + 2,
                        name: 'Rachel Green',
                        avatar: '👩‍🌾',
                        content: 'Beautiful sunset from my balcony tonight. Sometimes you need to pause and appreciate the simple moments. 🌅',
                        timestamp: Date.now() - 10 * 60 * 60 * 1000,
                        type: 'video',
                        mediaUrl: sampleVideos[Math.floor(Math.random() * sampleVideos.length)],
                        liked: false,
                        likes: 7,
                        comments: []
                    }
                ];
                setPosts([...posts, ...additionalPosts]);
            };

            return (
                <div className="container-manarea">
                    <div className="main-layout">
                        <div className="main-content">
                            <Stories 
                                stories={stories}
                                onAddStatus={() => setShowAddStatusModal(true)}
                                onViewStatus={handleViewStatus}
                            />
                            <PostCreation onCreatePost={handleCreatePost} />
                            <Feed 
                                posts={posts} 
                                onLoadMore={handleLoadMore}
                                onLike={handleLike}
                                onComment={handleComment}
                            />
                        </div>
                        <Sidebar />
                    </div>

                    <StatusModal 
                        isOpen={showStatusModal}
                        onClose={() => setShowStatusModal(false)}
                        stories={stories}
                        currentIndex={currentStatusIndex}
                        onNext={handleNextStatus}
                        onPrev={handlePrevStatus}
                    />

                    <AddStatusModal 
                        isOpen={showAddStatusModal}
                        onClose={() => setShowAddStatusModal(false)}
                        onAdd={handleAddStatus}
                    />
                </div>
            );
        };
export default GistsPage














