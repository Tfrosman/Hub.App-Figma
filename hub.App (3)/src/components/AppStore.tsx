import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  X, 
  Search, 
  Star, 
  Download, 
  Smartphone,
  Gamepad2,
  BookOpen,
  Heart,
  Camera,
  Music,
  Zap,
  ArrowLeft,
  Share,
  Flag,
  ShoppingBag
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface App {
  id: string;
  name: string;
  developer: string;
  description: string;
  category: string;
  icon: string;
  rating: number;
  downloads: string;
  size: string;
  screenshots: string[];
  price: string;
  inAppPurchases?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface AppStoreProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export function AppStore({ isOpen, onClose, isMobile = true }: AppStoreProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'categories' | 'search'>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = [
    { id: 'productivity', name: 'Produtividade', icon: <Zap className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'entertainment', name: 'Entretenimento', icon: <Gamepad2 className="w-6 h-6" />, color: 'bg-purple-500' },
    { id: 'education', name: 'Educação', icon: <BookOpen className="w-6 h-6" />, color: 'bg-green-500' },
    { id: 'lifestyle', name: 'Estilo de Vida', icon: <Heart className="w-6 h-6" />, color: 'bg-pink-500' },
    { id: 'photo', name: 'Foto e Vídeo', icon: <Camera className="w-6 h-6" />, color: 'bg-orange-500' },
    { id: 'music', name: 'Música', icon: <Music className="w-6 h-6" />, color: 'bg-red-500' }
  ];

  const featuredApps: App[] = [
    {
      id: '1',
      name: 'FotoFamília',
      developer: 'Família Apps',
      description: 'Organize e compartilhe fotos da família de forma segura e privada.',
      category: 'photo',
      icon: '📸',
      rating: 4.8,
      downloads: '10K+',
      size: '45 MB',
      screenshots: [],
      price: 'Grátis',
      inAppPurchases: true
    },
    {
      id: '2',
      name: 'Lista Conectada',
      developer: 'Família Apps',
      description: 'Lista de compras compartilhada em tempo real para toda a família.',
      category: 'productivity',
      icon: '🛒',
      rating: 4.6,
      downloads: '25K+',
      size: '12 MB',
      screenshots: [],
      price: 'Grátis'
    },
    {
      id: '3',
      name: 'ReceitasBrasil',
      developer: 'Culinary Dev',
      description: 'Milhares de receitas brasileiras tradicionais da vovó.',
      category: 'lifestyle',
      icon: '👨‍🍳',
      rating: 4.9,
      downloads: '100K+',
      size: '78 MB',
      screenshots: [],
      price: 'R$ 9,90'
    },
    {
      id: '4',
      name: 'MeditaçãoPlus',
      developer: 'Wellness Co',
      description: 'Meditações guiadas para toda a família, incluindo crianças.',
      category: 'lifestyle',
      icon: '🧘‍♀️',
      rating: 4.7,
      downloads: '50K+',
      size: '120 MB',
      screenshots: [],
      price: 'Grátis',
      inAppPurchases: true
    }
  ];

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedApp(null);
  };

  const handleBackToApps = () => {
    setSelectedApp(null);
  };

  const renderFeatured = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Apps em Destaque</h2>
        <p className="text-gray-600">Aplicativos recomendados para sua família</p>
      </div>

      {/* Featured App Card */}
      <motion.div 
        className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
            📸
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium mb-1">FotoFamília</h3>
            <p className="text-white/80 text-sm mb-3">Editor de Escolha</p>
            <p className="text-white/90 text-sm leading-relaxed">
              O melhor app para organizar e compartilhar momentos especiais da família.
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setSelectedApp(featuredApps[0])}
          className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          Ver Detalhes
        </Button>
      </motion.div>

      {/* Apps Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Novos Aplicativos</h3>
        <div className="space-y-3">
          {featuredApps.slice(1).map((app) => (
            <motion.div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{app.name}</h4>
                <p className="text-sm text-gray-600 truncate">{app.developer}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{app.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">{app.downloads}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{app.price}</p>
                {app.inAppPurchases && (
                  <p className="text-xs text-gray-500">Compras no app</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="text-center pb-4">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Categorias</h2>
        <p className="text-gray-600">Explore apps por categoria</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`${category.color} rounded-2xl p-6 text-white cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center text-center">
              {category.icon}
              <span className="mt-3 font-medium">{category.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAppDetails = () => {
    if (!selectedApp) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToApps}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-medium text-gray-900">Detalhes do App</h2>
        </div>

        {/* App Info */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl">
            {selectedApp.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-gray-900">{selectedApp.name}</h3>
            <p className="text-gray-600 mb-2">{selectedApp.developer}</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{selectedApp.rating}</span>
              </div>
              <span className="text-sm text-gray-600">{selectedApp.downloads} downloads</span>
            </div>
            <Badge variant="secondary" className="bg-gray-100">
              {categories.find(c => c.id === selectedApp.category)?.name}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            {selectedApp.price === 'Grátis' ? 'Instalar' : `Comprar ${selectedApp.price}`}
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="w-4 h-4" />
          </Button>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Sobre este app</h4>
          <p className="text-gray-700 leading-relaxed">{selectedApp.description}</p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Tamanho</p>
            <p className="font-medium">{selectedApp.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Categoria</p>
            <p className="font-medium">{categories.find(c => c.id === selectedApp.category)?.name}</p>
          </div>
        </div>

        {selectedApp.inAppPurchases && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Compras no app</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Este app oferece compras adicionais dentro do aplicativo.
            </p>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  const containerClasses = isMobile 
    ? "fixed inset-0 z-50 flex items-center"
    : "fixed inset-0 z-50 flex items-center justify-center p-6";

  const contentClasses = isMobile
    ? "w-full h-[70vh] bg-white rounded-3xl shadow-2xl mx-4 mb-[30vh]"
    : "w-full max-w-4xl h-[80vh] bg-white rounded-3xl shadow-2xl";

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        <motion.div
          key="appstore-backdrop"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>

      {/* App Store Content */}
      <AnimatePresence>
        <motion.div
          key="appstore-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={containerClasses}
        >
          {/* Content */}
          <motion.div
            key="appstore-content"
            className={contentClasses}
            initial={isMobile ? { scale: 0.8, opacity: 0, y: 50 } : { scale: 0.9, opacity: 0 }}
            animate={isMobile ? { scale: 1, opacity: 1, y: 0 } : { scale: 1, opacity: 1 }}
            exit={isMobile ? { scale: 0.8, opacity: 0, y: 50 } : { scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-medium text-gray-900">App Store</h1>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Tabs */}
            {!selectedApp && (
              <div className="flex border-b border-gray-100 flex-shrink-0">
                {[
                  { key: 'featured', label: 'Destaques' },
                  { key: 'categories', label: 'Categorias' },
                  { key: 'search', label: 'Buscar' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Search Bar */}
            {activeTab === 'search' && !selectedApp && (
              <div className="p-6 border-b border-gray-100 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar aplicativos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {selectedApp ? renderAppDetails() : (
                    <>
                      {activeTab === 'featured' && renderFeatured()}
                      {activeTab === 'categories' && renderCategories()}
                      {activeTab === 'search' && (
                        <div className="text-center py-12">
                          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Digite algo para buscar aplicativos</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}