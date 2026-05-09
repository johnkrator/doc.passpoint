import {
    Home,
    Book,
    Users,
    BarChart3,
    FileText,
    Settings,
    Send,
    ArrowDownToLine,
    ArrowUpToLine,
    Globe,
    DollarSign,
    TrendingUp,
    History,
    MessageSquare,
    Webhook,
    CheckCircle,
    Building2,
    RefreshCw,
    MapPin,
    CreditCard,
    Shield,
    Code,
    X,
    type LucideIcon,
} from 'lucide-react';

// Icon mapping from string names to Lucide components
export const iconMap: Record<string, LucideIcon> = {
    'Home': Home,
    'Book': Book,
    'Users': Users,
    'BarChart3': BarChart3,
    'FileText': FileText,
    'Settings': Settings,
    'Send': Send,
    'ArrowDownToLine': ArrowDownToLine,
    'ArrowUpToLine': ArrowUpToLine,
    'Globe': Globe,
    'DollarSign': DollarSign,
    'TrendingUp': TrendingUp,
    'History': History,
    'MessageSquare': MessageSquare,
    'Webhook': Webhook,
    'CheckCircle': CheckCircle,
    'Building2': Building2,
    'RefreshCw': RefreshCw,
    'MapPin': MapPin,
    'CreditCard': CreditCard,
    'Shield': Shield,
    'Code': Code,
    'X': X,
};

// Get icon component by name, fallback to FileText if not found
export const getIconByName = (iconName?: string): LucideIcon => {
    if (!iconName) return FileText;
    return iconMap[iconName] || FileText;
};
