import {
  useCallback, useRef, useState, createRef,
  useEffect,
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListner = animationEndListners.current.get(itemId);
    removeListner();

    animatedRefs.current.delete(itemId);
    animationEndListners.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => itemId !== id),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListners = animationEndListners.current.has(itemId);

      if (animatedElement && !alreadyHasListners) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListner = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animationEndListners.current.set(itemId, removeListner);
        animatedElement.addEventListener('animationend', onAnimationEnd);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListners = animationEndListners.current;

    return () => {
      removeListners.forEach((removeListner) => removeListner());
    };
  }, []);

  function handleRemoveItem(id) {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();

      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);

      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    renderList,
    handleRemoveItem,
  };
}
