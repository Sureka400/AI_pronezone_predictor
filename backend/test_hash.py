import bcrypt
import passlib.context

# Fix for passlib/bcrypt 4.x/5.x compatibility
if not hasattr(bcrypt, "__about__"):
    bcrypt.__about__ = type('about', (object,), {'__version__': bcrypt.__version__})

def test_hashing():
    password = "admin123"
    print(f"Testing hashing for: {password}")
    
    # Test direct bcrypt
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    print(f"Bcrypt direct: {hashed}")
    
    # Test passlib
    ctx = passlib.context.CryptContext(schemes=["bcrypt"], deprecated="auto")
    try:
        p_hashed = ctx.hash(password)
        print(f"Passlib: {p_hashed}")
    except Exception as e:
        print(f"Passlib failed: {e}")

if __name__ == "__main__":
    test_hashing()
