function MainScreen() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Description />
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <AvailableMeals></AvailableMeals>
      </main>
    </CartProvider>
  );
}

export default App;
