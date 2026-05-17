import React from 'react';
import { Leaf, Egg, Drumstick, Bug, AlertTriangle, HelpCircle } from 'lucide-react';

const ResultsDisplay = ({ data }) => {
  if (!data) return null;

  const { verdict, reasoning, ingredients } = data;

  const getVerdictClass = (v) => {
    const vLower = v.toLowerCase().replace('/', '-');
    if (vLower === 'vegan' || vLower === 'vegetarian') return 'vegan';
    if (vLower === 'non-vegetarian') return 'non-vegetarian';
    return 'needs-checking';
  };

  const getIngredientClass = (c) => {
    const cLower = c.toLowerCase().replace('/', '-');
    if (cLower === 'vegan' || cLower === 'vegetarian') return 'vegan';
    if (cLower === 'egg' || cLower === 'dairy') return 'egg';
    if (cLower === 'meat-fish' || cLower === 'insect') return 'meat-fish';
    return 'needs-checking';
  };

  const getIcon = (type) => {
    const tLower = type.toLowerCase().replace('/', '-');
    if (tLower === 'vegan') return <Leaf color="var(--success)" size={16} />;
    if (tLower === 'vegetarian') return <Leaf color="var(--success)" size={16} />;
    if (tLower === 'egg') return <Egg color="var(--warning)" size={16} />;
    if (tLower === 'dairy') return <Egg color="var(--warning)" size={16} />;
    if (tLower === 'meat-fish') return <Drumstick color="var(--danger)" size={16} />;
    if (tLower === 'insect') return <Bug color="var(--danger)" size={16} />;
    return <HelpCircle color="var(--text-light)" size={16} />;
  };

  const getVerdictIcon = (v) => {
    const vLower = v.toLowerCase().replace('/', '-');
    if (vLower === 'vegan') return <Leaf size={24} />;
    if (vLower === 'vegetarian') return <Leaf size={24} />;
    if (vLower === 'non-vegetarian') return <AlertTriangle size={24} />;
    return <HelpCircle size={24} />;
  };

  return (
    <div className="results">
      <div className={`verdict-banner ${getVerdictClass(verdict)}`}>
        {getVerdictIcon(verdict)}
        <span>{verdict}</span>
      </div>
      
      <div className="reasoning">
        <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} /> AI Analysis
        </h4>
        <p>{reasoning}</p>
      </div>

      <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
         Ingredient Breakdown
      </h4>
      <div className="ingredients-list">
        {ingredients.map((ing, idx) => (
          <div key={idx} className={`ingredient-tag ${getIngredientClass(ing.classification)}`}>
            {getIcon(ing.classification)}
            <span>{ing.name}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginLeft: '4px' }}>
              ({ing.classification})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
