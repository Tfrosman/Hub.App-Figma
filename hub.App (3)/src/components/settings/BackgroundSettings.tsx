import { useState, useRef } from 'react';
import { Upload, Eye, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { useSettings } from '../../hooks/useSettings';

export function BackgroundSettings() {
  const { background, updateBackground } = useSettings();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size before processing
    const maxSizeInMB = 2; // 2MB limit for images
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    
    if (file.size > maxSizeInBytes) {
      alert(`A imagem é muito grande (${(file.size / (1024 * 1024)).toFixed(1)}MB). Por favor, escolha uma imagem menor que ${maxSizeInMB}MB.`);
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        // Check the resulting base64 size
        const sizeInBytes = new Blob([imageUrl]).size;
        const maxStorageSize = 2 * 1024 * 1024; // 2MB for base64
        
        if (sizeInBytes > maxStorageSize) {
          alert('A imagem processada é muito grande para ser salva. A imagem será aplicada temporariamente, mas não será mantida após recarregar a página.');
        }
        
        updateBackground({ image: imageUrl });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao processar a imagem. Tente novamente.');
      setUploading(false);
    }
  };

  const handleUnsplashSearch = async (query: string) => {
    try {
      // Use real Unsplash images that don't require large storage
      const unsplashImages = {
        'family gathering': 'https://images.unsplash.com/photo-1722252799088-4781aabc3d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTY3MTg2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'nature landscape': 'https://images.unsplash.com/photo-1638544576933-d2bdf36ef947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU2NzI5NjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'sunset mountains': 'https://images.unsplash.com/photo-1720709626262-34eaf9942e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc1NjcyNDIwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'beach ocean': 'https://images.unsplash.com/photo-1611794416281-6664ddf1a929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzU2ODA2NjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'forest trees': 'https://images.unsplash.com/photo-1663312790104-c16cd011b761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwxfHx8fDE3NTY3ODk3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'city skyline': 'https://images.unsplash.com/photo-1619297560564-f183f9b1fb6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHVyYmFufGVufDF8fHx8MTc1Njc5MjMwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'minimal abstract': 'https://images.unsplash.com/photo-1679193559674-860ef78899bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWwlMjBncmFkaWVudHxlbnwxfHx8fDE3NTY4MTQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      };
      
      const imageUrl = unsplashImages[query as keyof typeof unsplashImages] || unsplashImages['nature landscape'];
      updateBackground({ image: imageUrl });
    } catch (error) {
      console.error('Error setting background image:', error);
    }
  };

  const previewStyle = {
    backgroundImage: `url(${background.image})`,
    backgroundPosition: background.position,
    backgroundSize: background.size,
    opacity: background.opacity
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Imagem de Fundo
        </CardTitle>
        <CardDescription>
          Personalize a imagem de fundo da tela inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Background Preview */}
        <div className="space-y-3">
          <Label>Preview Atual</Label>
          <div 
            className="w-full h-32 rounded-lg border border-border bg-cover bg-center relative overflow-hidden"
            style={previewStyle}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-medium drop-shadow-lg">
                Família
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {isPreviewMode ? 'Ocultar Preview' : 'Preview em Tela Cheia'}
            </Button>
          </div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4">
          <div>
            <Label>Escolher Nova Imagem</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Imagens personalizadas são temporárias e não são salvas permanentemente devido às limitações do navegador. Para uso permanente, use as opções pré-definidas.
            </p>
          </div>
          
          {/* Upload from device */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Enviando...' : 'Enviar do Dispositivo (Temporário)'}
              </Button>
            </div>

            {/* Quick Unsplash options */}
            <div className="space-y-2">
              <Select onValueChange={handleUnsplashSearch}>
                <SelectTrigger>
                  <SelectValue placeholder="Imagens Prontas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family gathering">Família Reunida</SelectItem>
                  <SelectItem value="nature landscape">Paisagem Natural</SelectItem>
                  <SelectItem value="sunset mountains">Pôr do Sol</SelectItem>
                  <SelectItem value="beach ocean">Praia e Oceano</SelectItem>
                  <SelectItem value="forest trees">Floresta</SelectItem>
                  <SelectItem value="city skyline">Cidade</SelectItem>
                  <SelectItem value="minimal abstract">Abstrato Minimalista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Position Settings */}
        <div className="space-y-3">
          <Label>Posicionamento da Imagem</Label>
          <Select value={background.position} onValueChange={(value) => updateBackground({ position: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="top">Topo</SelectItem>
              <SelectItem value="bottom">Inferior</SelectItem>
              <SelectItem value="left">Esquerda</SelectItem>
              <SelectItem value="right">Direita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size Settings */}
        <div className="space-y-3">
          <Label>Tamanho da Imagem</Label>
          <Select value={background.size} onValueChange={(value) => updateBackground({ size: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cobrir (Padrão)</SelectItem>
              <SelectItem value="contain">Conter</SelectItem>
              <SelectItem value="auto">Tamanho Original</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Opacity Settings */}
        <div className="space-y-3">
          <Label>Opacidade: {Math.round(background.opacity * 100)}%</Label>
          <Slider
            value={[background.opacity]}
            onValueChange={(value) => updateBackground({ opacity: value[0] })}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Reset to Default */}
        <Button
          variant="outline"
          onClick={() => updateBackground({
            image: 'figma:asset/99ca56e4a7a1b2eb866bf3a55721ef0f2f4d2b5c.png',
            position: 'center',
            size: 'cover',
            opacity: 1
          })}
          className="w-full flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Restaurar Imagem Padrão
        </Button>
      </CardContent>

      {/* Full Screen Preview Modal */}
      {isPreviewMode && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-96 rounded-lg overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={previewStyle}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-light tracking-wider italic drop-shadow-lg">
                  Família
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => setIsPreviewMode(false)}
              className="absolute top-4 right-4"
            >
              Fechar Preview
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}