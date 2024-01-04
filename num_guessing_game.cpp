#include<iostream>
#include<string>
#include<cstdlib>
using namespace std;
int main()
{
    char ch;
    int choice;
    int num;
    string name;
    cout<<"                  enter your name :   ";
    cin>>name;
    cout<<endl<<endl;
    cout<<"           Welcome "<<name<<" to our number guessing game   "<<endl<<endl;
    cout<<"                  EASY LEVEL   : enter 1"<<endl;
    cout<<"                  MEDIUM LEVEL : enter 2"<<endl;
    cout<<"                  HARD LEVEL   : enter 3"<<endl;
    cout<<"Enter your choice :  ";
    cin>>choice;
    cout<<"************************************************************************************************************************"<<endl<<endl;
    if(choice==1)
    {
        do
    {
       srand(0);
       int gnum=(rand()%(5-1+1));
       cout<<"                  enter number in range of 1 to 5 :          ";
       cin>>num;
       cout<<endl<<endl;
       if(gnum==num)
       {
           cout<<"           Woohooo!! Congratulations you guessed correct number"<<endl<<endl;
       }
       else{
        cout<<"                      Sorry , try next better luck"<<endl<<endl;
       }
       cout<<"                  Would you like to play again ?  Y/N :      ";
       cin>>ch;
       cout<<endl<<endl;
       cout<<"________________________________________________________________________________________________________________________"<<endl<<endl;
    }while(ch!='N');
    }
    if(choice==2)
    {
        do
    {
       srand(0);
       int gnum=(rand()%(10-1+1));
       cout<<"                  enter number in range of 1 to 10 :          ";
       cin>>num;
       cout<<endl<<endl;
       if(gnum==num)
       {
           cout<<"           Woohooo!! Congratulations you guessed correct number"<<endl<<endl;
       }
       else{
        cout<<"                      Sorry , try next better luck"<<endl<<endl;
       }
       cout<<"                  Would you like to play again ?  Y/N :      ";
       cin>>ch;
       cout<<endl<<endl;
       cout<<"________________________________________________________________________________________________________________________"<<endl<<endl;
    }while(ch!='N');
    }
    if(choice==3)
    {
        do
    {
       srand(0);
       int gnum=(rand()%(15-1+1));
       cout<<"                  enter number in range of 1 to 15 :          ";
       cin>>num;
       cout<<endl<<endl;
       if(gnum==num)
       {
           cout<<"           Woohooo!! Congratulations you guessed correct number"<<endl<<endl;
       }
       else{
        cout<<"                      Sorry , try next better luck"<<endl<<endl;
       }
       cout<<"                  Would you like to play again ?  Y/N :      ";
       cin>>ch;
       cout<<endl<<endl;
       cout<<"________________________________________________________________________________________________________________________"<<endl<<endl;
    }while(ch!='N');
    }

}
