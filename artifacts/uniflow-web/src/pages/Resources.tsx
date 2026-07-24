import { useState } from 'react';
import { FileText, Video, Link as LinkIcon, FileArchive, Download, Search, Filter, MoreVertical, BookOpen } from 'lucide-react';
import { mockResources } from '@/lib/mock-data';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'PDF', 'Vidéo', 'Lien', 'Archive', 'Présentation'];

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText size={24} className="text-red-500" />;
      case 'Vidéo': return <Video size={24} className="text-blue-500" />;
      case 'Lien': return <LinkIcon size={24} className="text-green-500" />;
      case 'Archive': return <FileArchive size={24} className="text-purple-500" />;
      case 'Présentation': return <BookOpen size={24} className="text-yellow-500" />;
      default: return <FileText size={24} className="text-gray-500" />;
    }
  };

  const filteredResources = mockResources.filter(r => {
    const matchesSearch = r.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.ue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Tous' || r.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bibliothèque</h1>
          <p className="text-gray-500 text-sm mt-1">Accédez aux supports de cours, TD, et documents partagés.</p>
        </div>
        <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors shadow-sm self-start md:self-auto">
          Soumettre un document
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un document, une UE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all outline-none"
          />
        </div>
        <div className="flex w-full md:w-auto overflow-x-auto gap-2 pb-2 md:pb-0 hide-scrollbar">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                {getIcon(resource.type)}
              </div>
              <button className="text-gray-400 hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#1E3A8A] transition-colors cursor-pointer">
                {resource.titre}
              </h3>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md">
                  {resource.ue}
                </span>
                <span className="text-xs text-gray-500">
                  {resource.type}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">{resource.enseignant}</span>
                <span className="text-[10px] text-gray-400">{resource.dateAjout}</span>
              </div>
              <div className="flex items-center gap-3">
                {resource.taille !== '-' && <span className="text-xs font-medium text-gray-400">{resource.taille}</span>}
                <button className="h-8 w-8 rounded-full bg-[#1E3A8A]/5 text-[#1E3A8A] flex items-center justify-center hover:bg-[#1E3A8A] hover:text-white transition-colors">
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Aucun document trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
}