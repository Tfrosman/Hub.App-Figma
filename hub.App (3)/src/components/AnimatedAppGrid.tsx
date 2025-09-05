import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Brain, 
  Heart, 
  UserPlus,
  Calendar,
  Baby,
  Book,
  UsersRound,
  MessageCircle,
  Instagram,
  Youtube,
  Headphones,
  CalendarDays,
  Music,
  Sparkles,
  PauseCircle,
  ShoppingBag,
  Settings
} from 'lucide-react';

interface AppItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  onClick?: () => void;
}

interface AnimatedAppGridProps {
  isSidebar?: boolean;
  onAppStoreOpen?: () => void;
  onSettingsOpen?: () => void;
}

export function AnimatedAppGrid({ isSidebar = false, onAppStoreOpen, onSettingsOpen }: AnimatedAppGridProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  const apps: AppItem[] = [
    {
      id: "app-store",
      icon: <ShoppingBag className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "App Store",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
      onClick: onAppStoreOpen
    },
    {
      id: "settings",
      icon: <Settings className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "Configurações",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
      onClick: onSettingsOpen
    },
    {
      id: "quem-nos-somos",
      icon: <Users className="w-5 h-5 md:w-8 md:h-8 text-red-600" />,
      label: "Quem Nós Somos",
      bgColor: "bg-yellow-400"
    },
    {
      id: "meditacao",
      icon: <Brain className="w-5 h-5 md:w-8 md:h-8 text-black" />,
      label: "Meditação Semanal",
      bgColor: "bg-white"
    },
    {
      id: "contribua",
      icon: <Heart className="w-5 h-5 md:w-8 md:h-8 text-red-500" />,
      label: "Contribua",
      bgColor: "bg-white"
    },
    {
      id: "faca-parte",
      icon: <UserPlus className="w-5 h-5 md:w-8 md:h-8 text-blue-400" />,
      label: "Faça Parte",
      bgColor: "bg-gray-900"
    },
    {
      id: "tema-ano",
      icon: <Calendar className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "Tema do Ano",
      bgColor: "bg-green-500"
    },
    {
      id: "kids",
      icon: <Baby className="w-5 h-5 md:w-8 md:h-8 text-black" />,
      label: "Kids",
      bgColor: "bg-white"
    },
    {
      id: "biblia",
      icon: <Book className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "App Bíblia",
      bgColor: "bg-red-700"
    },
    {
      id: "grupos",
      icon: <UsersRound className="w-5 h-5 md:w-8 md:h-8 text-black" />,
      label: "Grupos Pequenos",
      bgColor: "bg-white"
    },
    {
      id: "whatsapp",
      icon: <MessageCircle className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "Grupo WhatsApp",
      bgColor: "bg-green-500"
    },
    {
      id: "instagram",
      icon: <Instagram className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "Insta",
      bgColor: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
    },
    {
      id: "youtube",
      icon: <Youtube className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "YouTube",
      bgColor: "bg-red-600"
    },
    {
      id: "podcast",
      icon: <Headphones className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "PodCast",
      bgColor: "bg-orange-500"
    },
    {
      id: "agenda",
      icon: <CalendarDays className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />,
      label: "Agenda da Família",
      bgColor: "bg-white"
    },
    {
      id: "playlist",
      icon: <Music className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "Playlist Músicas",
      bgColor: "bg-red-500"
    },
    {
      id: "sozo",
      icon: <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-black" />,
      label: "SOZO",
      bgColor: "bg-white"
    },
    {
      id: "pare-por-um",
      icon: <PauseCircle className="w-5 h-5 md:w-8 md:h-8 text-white" />,
      label: "Pare por Um",
      bgColor: "bg-green-700"
    }
  ];

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (isSidebar) {
    // Sidebar layout for desktop
    return (
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.05 }}
      >
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.03,
              ease: "easeOut"
            }}
            className="group"
          >
            <motion.button 
              className="w-full hover:bg-white/20 text-white h-auto p-3 justify-start gap-3 flex items-center rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={app.onClick}
            >
              <motion.div 
                className={`
                  w-8 h-8 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0
                  ${app.bgColor}
                `}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {app.icon}
              </motion.div>
              <span className="text-sm text-[12px]">{app.label}</span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Grid layout for mobile
  return (
    <motion.div 
      className="grid grid-cols-4 gap-3 justify-items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.05 }}
    >
      <AnimatePresence>
        {apps.map((app, index) => (
          <motion.div 
            key={app.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
            className="flex flex-col items-center justify-start space-y-1.5 w-full"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center"
              onClick={app.onClick}
            >
              <motion.div 
                className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg
                  ${app.bgColor}
                `}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {app.icon}
              </motion.div>
            </motion.button>
            <motion.span 
              className="text-white text-xs text-center leading-tight px-1 max-w-full"
              style={{ 
                wordBreak: "break-word",
                hyphens: "auto",
                fontSize: "11px",
                lineHeight: "1.2"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              {app.label}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}